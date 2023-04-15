import Layout from '../components/Layout';
import RoomCard from '../components/RoomCard';
import '../styles/Room.css';
const Room = () => {
  return (
    <Layout>
      <main className="cardArea">
        <RoomCard rid="1" rname="test1" />
        <RoomCard rid="2" rname="test2" />
        <RoomCard rid="3" rname="test3" />
        <RoomCard rid="4" rname="test4" />
        <RoomCard rid="5" rname="test5" />
        <RoomCard rid="6" rname="test6" />
      </main>
    </Layout>
  );
};

export default Room;
