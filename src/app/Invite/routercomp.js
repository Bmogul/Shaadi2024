import { useRouter } from 'next/router';

const RouterComponent = () => {
  const router = useRouter();
  const { guid } = router.query;

  // Use the `guid` value as needed

  return <div>{/* Your component content */}</div>;
};

export default RouterComponent;
