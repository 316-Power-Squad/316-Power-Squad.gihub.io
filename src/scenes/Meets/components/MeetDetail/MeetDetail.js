// @flow
import React from 'react';
import { Table, Tabs } from 'antd';
import { Flex, Box } from 'reflexbox';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import MeetDetailStore from './MeetDetailStore';
import { VictoryChart, VictoryBar, VictoryLabel } from 'victory';
import image from 'assets/placement.png';

const TabPane = Tabs.TabPane;

type Props = {
  match: Object
};

const columns = [
  {
    title: 'Team',
    dataIndex: 'team',
    key: 'team'
  },
  {
    title: 'Region',
    dataIndex: 'region',
    key: 'region'
  },
  {
    title: 'Placement',
    dataIndex: 'placement',
    key: 'placement'
  }
];

@observer
class MeetDetail extends React.Component<Props> {
  store: MeetDetailStore;

  constructor(props: Props) {
    super(props);
    const { match: { params: { id } } } = props;
    this.store = new MeetDetailStore({ id });
  }

  componentDidMount() {
    this.store.getMeet();
  }

  renderMeetContent = () => {
    if (this.store.loading) {
      return <div>loading</div>;
    }
    return (
      <StyledTabs defaultActiveKey="mens" onChange={this.store.changeGender}>
        <TabPane tab="Mens" key="mens">
          <FlexTable
            bordered
            title={() => 'Results'}
            dataSource={this.store.mensResults}
            columns={columns}
            pagination={{
              defaultPageSize: 5
            }}
          />
        </TabPane>
        <TabPane tab="Womens" key="womens">
          <FlexTable
            bordered
            title={() => 'Results'}
            dataSource={this.store.womensResults}
            columns={columns}
            pagination={{
              defaultPageSize: 5
            }}
          />
        </TabPane>
      </StyledTabs>
    );
  };

  render() {
    return (
      <Flex auto>
        <Box w={[1, 1, 1 / 2]}>
          {this.renderMeetContent()}
        </Box>
        <Box w={[1, 1, 1 / 2]}>
          {!this.store.loading &&
            <AddOrInfo auto column align="center" justify="center" m={3}>
              <ChartTitle>Average Placements by Region</ChartTitle>
              <StyledVictoryChart>
                <VictoryBar
                  data={this.store.placementPerRegion}
                  horizontal
                  labelComponent={
                    <VictoryLabel dx={30} style={{ fontSize: 10 }} />
                  }
                  x="region"
                  y="placement"
                />
              </StyledVictoryChart>
            </AddOrInfo>}
        </Box>
      </Flex>
    );
  }
}

const StyledVictoryChart = styled(VictoryChart)`
  padding-left: 50px !important;
`;

const ChartTitle = styled.h2`
  margin-top: 10px;
  margin-bottom: -20px;
`;

const StyledTabs = styled(Tabs)`
  .ant-tabs-bar {
    padding-left: 32px;
  }
`;

const AddOrInfo = styled(Flex)`
  background: #fff;
  border: 1px solid lightgray;
  border-radius: 4px;
  padding-left: 20px;
`;

const FlexTable = styled(Table)`
  margin: 30px;
  .ant-table {
    background: #fff;
  }
`;

export default withRouter(MeetDetail);
