// @flow
import { observable, computed, action } from 'mobx';
import { getRequest } from 'helpers/api';

class TeamsStore {
  @observable queryString: string = '';
  @observable teams: Object[] = [];
  @observable activeTeamId: number;
  @observable loading: boolean = true;

  @computed
  get activeTeam(): Object {
    return this.teams.find(team => team.ID === this.activeTeamId) || {};
  }

  @computed
  get visibleTeams(): Array<Object> {
    return this.teams.filter(team => team.name.toLowerCase().includes(this.queryString.toLowerCase()));
  }

  @action
  changeQueryString = (query: string) => {
    this.queryString = query;
  };

  @action
  setActiveTeam = (id: number): void => {
    this.activeTeamId = id;
  };

  @action
  getTeams = async (): Promise<*> => {
    try {
      const res = await getRequest('/api/teams', {});
      if (res.data) {
        this.teams = res.data;
        this.loading = false;
      }
    } catch (err) {
      console.log(err);
    }
  };
}

export default TeamsStore;
