import * as React from 'react';
import { inject, observer } from 'mobx-react';
import QualificationStore from 'stores/QualificationStore';
import { Card } from 'antd';
import { Flex } from 'reflexbox';
import styled from 'styled-components';

type Props = {
  className: string,
  qual: QualificationStore,
  region: {
    id: string,
    name: string,
    num_teams: number
  }
};

const RegionTitle = ({ region }) =>
  <Flex>
    <Title>
      {region.name}
    </Title>
    <NumTeams>{`(${region.num_teams} teams)`}</NumTeams>
  </Flex>;

@observer
class RegionCard extends React.Component<Props> {
  get mensQalifyingCount() {
    return Math.floor(Math.random() * 5);
  }

  get womensQalifyingCount() {
    return Math.floor(Math.random() * 5);
  }

  render() {
    const { region, className } = this.props;
    return (
      <StyledCard title={<RegionTitle region={region} />} className={className}>
        {`This region currently has ${this
          .mensQalifyingCount} teams qualifying for men's nationals and ${this
          .womensQalifyingCount} teams qualifying for women's nationals.`}
      </StyledCard>
    );
  }
}

const StyledCard = styled(Card)`
  .ant-card-head {
    height: auto !important;
  }
`;

const NumTeams = styled.span`color: gray;`;

const Title = styled.h3`margin-right: 8px;`;

export default inject('qual')(RegionCard);
