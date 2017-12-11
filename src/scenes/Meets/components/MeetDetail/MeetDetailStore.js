import { action, observable, computed } from 'mobx';
import { getRequest } from 'helpers/api';

class MeetDetailStore {
  id: string;
  @observable meet: Array<Object>;
  @observable loading: boolean = true;
  @observable activeGender: string = 'mens';

  @computed
  get mensResults(): Object {
    return this.meet
      .filter(team => team.gender === 'mens')
      .map((team, i) => ({ ...team, key: i }))
      .sort((a, b) => a.placement - b.placement);
  }

  @computed
  get womensResults(): Object {
    return this.meet
      .filter(team => team.gender === 'womens')
      .map((team, i) => ({ ...team, key: i }))
      .sort((a, b) => a.placement - b.placement);
  }

  @computed
  get teamsPerRegion() {
    const results =
      this.activeGender === 'mens' ? this.mensResults : this.womensResults;
    let data = {};
    for (const team of results) {
      if (!data[team.region]) {
        data[team.region] = {
          numTeams: 1,
          placementSum: team.placement
        };
      } else {
        data[team.region] = {
          numTeams: data[team.region].numTeams + 1,
          placementSum: data[team.region].placementSum + team.placement
        };
      }
    }
    return data;
  }

  @computed
  get placementPerRegion() {
    let data = [];
    for (const key of Object.keys(this.teamsPerRegion)) {
      const { numTeams, placementSum } = this.teamsPerRegion[key];
      data.push({
        region: key,
        placement: placementSum / numTeams
      });
    }
    return data.sort((a, b) => a.placement - b.placement);
  }

  @action
  changeGender = (gender: string) => {
    this.activeGender = gender;
  };

  @action
  getMeet = async (): Promise<*> => {
    try {
      const res = await getRequest(`/api/meets/${this.id}`, {});
      if (res.data) {
        console.log(res.data);
        this.meet = res.data;
        this.loading = false;
      }
    } catch (err) {
      console.log(err);
    }
  };

  constructor(options: { id: string }) {
    this.id = options.id;
  }
}

export default MeetDetailStore;
