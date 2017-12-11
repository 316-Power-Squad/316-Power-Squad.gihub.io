// @flow
import * as React from 'react';
import { Flex } from 'reflexbox';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';
import { type RouterHistory } from 'react-router-dom';
import { Alert, Icon, Button } from 'antd';
import styled from 'styled-components';
import { colors } from 'constants/styles';
import LoginStore from './LoginStore';
import UserStore from 'stores/UserStore';
import UiStore from 'stores/UiStore';
import banner from 'assets/banner2.jpg';
import Input from 'components/Input';

type Props = {
  history: RouterHistory,
  user: UserStore,
  ui: UiStore
};

@observer
class Login extends React.Component<Props> {
  store: LoginStore;

  constructor(props: Props) {
    super(props);
    this.store = new LoginStore();
  }

  signUp = () => {
    this.props.history.push('/signup');
  };

  handleSubmit = () => {
    const { user, history } = this.props;
    this.store.loginUser(user, history);
  };

  render() {
    const { ui } = this.props;
    return (
      <FullHeight auto justify="center">
        {ui.isDesktop && (
          <Banner justify="center" align="center" auto>
            <BannerImage src={banner} alt="banner" />
            <BannerTextContainer>
              <BannerText>
                Kolas Calculator
                <SmallBannerText>
                  an online resource for Division I Cross Country teams and fans
                </SmallBannerText>
              </BannerText>
            </BannerTextContainer>
          </Banner>
        )}
        <LoginForm mobile={!ui.isDesktop}>
          <Item column>
            <UserIcon type="user" style={{ fontSize: 60 }} />
            <Input
              type="text"
              placeholder="Email"
              value={this.store.email}
              onChange={this.store.changeEmail}
              icon="mail"
            />
          </Item>
          <Item>
            <Input
              type="password"
              placeholder="Password"
              value={this.store.password}
              onChange={this.store.changePass}
              icon="lock"
            />
          </Item>
          {this.store.error && (
            <StyledAlert message={this.store.error} type="error" />
          )}
          <Item>
            <Flex column auto>
              <Button type="primary" onClick={this.handleSubmit}>
                Log In
              </Button>
              <CreateAccountContainer>
                New to us?
                <CreateAccountLink onClick={this.signUp}>
                  Create an account
                </CreateAccountLink>
              </CreateAccountContainer>
            </Flex>
          </Item>
        </LoginForm>
      </FullHeight>
    );
  }
}

const CreateAccountContainer = styled(Flex)`
  margin-top: 7px;
`;

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

const SmallBannerText = styled.h5`
  color: #fff;
  font-size: 1rem;
`;

const CreateAccountLink = styled.a`
  margin-left: 6px;
`;

const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 25px;
  width: 300px;
  text-align: center;
  ${({ mobile }) => mobile && ``};
`;

const FullHeight = styled(Flex)`
  min-height: 100vh;
`;

const Banner = styled(Flex)`
  background-color: ${colors.teal};
  overflow: hidden;
  position: relative;
`;

export { Login };
export default inject('user', 'ui')(withRouter(Login));
