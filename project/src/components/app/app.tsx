import HomeScreen from '../../pages/home-screen/home-screen';

type AppPropType = {
    title: string;
    genre: string;
    releaseYear: number;
}

function App(props: AppPropType): JSX.Element {
  return (
    <HomeScreen {...props}/>
  );
}

export default App;
