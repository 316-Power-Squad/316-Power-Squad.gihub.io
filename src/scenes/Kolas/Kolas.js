// @flow
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import KolasStore from './KolasStore';
import { Flex } from 'reflexbox';
import { Table, Input, Select, Row, Col, Card } from 'antd';
import QualificationStore from 'stores/QualificationStore';
import Layout from 'components/Layout';
import styled from 'styled-components';

const Option = Select.Option;

type Props = {
  qual: QualificationStore
};

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Points',
    dataIndex: 'points',
    key: 'points'
  }
];

@observer
class Kolas extends React.Component<Props> {
  store: KolasStore;

  constructor(props: Props) {
    super(props);
    this.store = new KolasStore();
  }

  componentDidMount() {
    this.getRankingsForGender();
  }

  handleGenderChange = () => {};

  get visibleTeams(): Array<Object> {
    const data =
      this.store.activeGender === 'mens'
        ? this.props.qual.mensRankings
        : this.props.qual.womensRankings;
    return this.store.queryString === ''
      ? data
      : data.filter(team => team.name.includes(this.store.queryString));
  }

  getRankingsForGender = () => {
    this.props.qual.getRankings(this.store.activeGender);
  };

  render() {
    return (
      <Layout>
        <Flex column auto>
          <InputRow>
            <PaddedSearch
              size="large"
              placeholder="filter teams"
              onSearch={this.store.changeQuery}
            />
            <PaddedSelect
              defaultValue="mens"
              size="large"
              style={{ width: 120 }}
              onChange={this.store.changeGender}
            >
              <Option value="mens">Men's</Option>
              <Option value="womens">Women's</Option>
            </PaddedSelect>
          </InputRow>
          <CardsContainer>
            <Row gutter={16}>
              <Col span={8}>
                <Card
                  title="Teams in Championship Meet"
                  bordered={false}
                  style={{ 'text-align': 'center' }}
                >
                  <h1>31</h1>
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  title="Auto Teams in Championship Meet"
                  bordered={false}
                  style={{ 'text-align': 'center' }}
                >
                  <h1>18</h1>
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  title="At Large Teams in Championship Meet"
                  bordered={false}
                  style={{ 'text-align': 'center' }}
                >
                  <h1>13</h1>
                </Card>
              </Col>
            </Row>
          </CardsContainer>
          <FlexTable
            bordered
            title={() => 'Predicted Bids'}
            dataSource={this.visibleTeams}
            columns={columns}
            pagination={{
              defaultPageSize: 10
            }}
          />
        </Flex>
      </Layout>
    );
  }
}

const CardsContainer = styled.div`
  background: #ececec;
  padding: 30px;
  margin-bottom: 10px;
`;

const PaddedSelect = styled(Select)`
  margin-right: 10px;
`;

const PaddedSearch = styled(Input.Search)`
  margin-right: 10px;
`;

const InputRow = styled(Flex)`
  margin: 30px;
  margin-bottom: 10px;
`;

const FlexTable = styled(Table)`
  margin: 30px;
  margin-top: 0px;
  .ant-table {
    background: #fff;
  }
`;

export { Kolas };
export default inject('qual')(Kolas);
