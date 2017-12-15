// @flow
import * as React from 'react';
import { Flex } from 'reflexbox';
import { inject, observer } from 'mobx-react';
import { Alert, Icon, Button } from 'antd';
import styled from 'styled-components';
import { type RouterHistory } from 'react-router-dom';
import { withRouter } from 'react-router';
import { colors } from 'constants/styles';
import UserStore from 'stores/UserStore';
import UiStore from 'stores/UiStore';
import SignUpStore from './SignUpStore';
import Input from 'components/Input';
import banner from 'assets/banner2.jpg';

type Props = {
  user: UserStore,
  ui: UiStore,
  history: RouterHistory
};

@observer
class SignUp extends React.Component<Props> {
  store: SignUpStore;

  constructor(props: Props) {
    super(props);
    this.store = new SignUpStore();
  }

  handleSubmit = (e: Object) => {
    const { user, history } = this.props;
    this.store.signUpUser(user, history);
  };

  render() {
    const { ui } = this.props;
    return (
      <FullHeight auto justify="center">
        {ui.isDesktop &&
          <Banner auto justify="center" align="center">
            <BannerImage src={banner} alt="banner" />
            <BannerTextContainer>
              <BannerText>Welcome to AtLarge</BannerText>
            </BannerTextContainer>
          </Banner>}
        <SignUpForm mobile={!ui.isDesktop}>
          <UserIcon type="user-add" style={{ fontSize: 60 }} />
          <Item>
            <Input
              value={this.store.name}
              onChange={this.store.changeName}
              placeholder="Name"
              icon="user"
            />
          </Item>
          <Item>
            <Input
              value={this.store.email}
              onChange={this.store.changeEmail}
              placeholder="Email"
              icon="mail"
            />
          </Item>
          <Item>
            <Input
              value={this.store.password}
              onChange={this.store.changePassword}
              type="password"
              placeholder="Password"
              icon="lock"
            />
          </Item>
          {this.store.error &&
            <StyledAlert message={this.store.error} type="error" />}
          <Item>
            <Flex auto column>
              <Button type="primary" onClick={this.handleSubmit}>
                Register
              </Button>
            </Flex>
          </Item>
        </SignUpForm>
      </FullHeight>
    );
  }
}

const StyledAlert = styled(Alert)`
  margin: 0 10px;
`;

const Item = styled(Flex)`
  margin: 10px;
`;

const UserIcon = styled(Icon)`
  margin-bottom: 30px;
`;

const BannerImage = styled.img`
  object-fit: cover;
  flex-shrink: 0;
  min-width: 100%;
  min-height: 100%;
  filter: blur(3px);
`;

const BannerTextContainer = styled(Flex)`
  position: absolute;
`;

const BannerText = styled.h1`
  color: #fff;
  font-size: 5rem;
`;

const SignUpForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 25px;
  width: 300px;
  text-align: center;
`;

const FullHeight = styled(Flex)`
  min-height: 100vh;
`;

const Banner = styled(Flex)`
  position: relative;
  overflow: hidden;
  background-color: ${colors.teal};
`;

export { SignUp };
export default inject('user', 'ui')(withRouter(SignUp));
