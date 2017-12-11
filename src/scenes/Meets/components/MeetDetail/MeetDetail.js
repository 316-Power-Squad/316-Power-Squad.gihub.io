// @flow
import React from 'react';
import { Table, Tabs } from 'antd';
import { Flex, Box } from 'reflexbox';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import MeetDetailStore from './MeetDetailStore';
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

  onTabChange = () => {};

  renderMeetContent = () => {
    if (this.store.loading) {
      return <div>loading</div>;
    }
    return (
      <StyledTabs defaultActiveKey="mens" onChange={this.onTabChange}>
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
        <Box w={[1, 3 / 4, 3 / 4]}>{this.renderMeetContent()}</Box>
        <Box w={[1, 1 / 4, 1 / 4]}>
          <AddOrInfo auto align="center" justify="center">
            <img src={image} alt="placements" width="250" />
          </AddOrInfo>
        </Box>
      </Flex>
    );
  }
}

const StyledTabs = styled(Tabs)`
  .ant-tabs-bar {
    padding-left: 32px;
  }
`;

const AddOrInfo = styled(Flex)`
  margin: 30px 30px 30px 0;
  height: 85%;
  background: #fff;
  border: 1px solid lightgray;
  border-radius: 4px;
  font-size: 20px;
`;

const FlexTable = styled(Table)`
  margin: 30px;
  .ant-table {
    background: #fff;
  }
`;

export default withRouter(MeetDetail);
