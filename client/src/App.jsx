import App from 'grommet/components/App';
import Heading from 'grommet/components/Heading';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';
import Search from 'grommet/components/Search';
import MenuIcon from 'grommet/components/icons/base/Menu';

class Hackfolio extends Component {
  constructor() {
    super();
    this.state = {
      name: ''
    };
  }

  componentWillMount() {
    fetch('/api/hello')
      .then(res => res.json())
      .then((result) => {
        this.setState({
          name: result.name,
        });
      });
  }

  render() {
    return (
      <App className="App">
        <Header fixed={false}
          float={false}
          splash={false}>
          <Title>
            Hackfolio
          </Title>
          <Box flex={true}
            justify='end'
            direction='row'
            responsive={false}>
            <Search inline={true}
              fill={true}
              size='medium'
              placeHolder='Search'
              dropAlign={{"right": "right"}} />
            <Menu icon={<MenuIcon />}
              dropAlign={{"right": "right"}}>
              <Anchor href='#'
              className='active'>
                First
              </Anchor>
              <Anchor href='#'>
                Second
              </Anchor>
              <Anchor href='#'>
                Third
              </Anchor>
            </Menu>
          </Box>
        </Header>
        <Heading>
          Hello World!
        </Heading>
      </App>
    );
  }
}

export default Hackfolio;
