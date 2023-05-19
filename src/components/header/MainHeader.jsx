
import { Input } from 'antd';

const { Search } = Input;

const onSearch = (value) => console.log(value);
const MainHeader = () => {

  return (
    <div style={{ background: '#E6EDF7', width: '100%', height: 50, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 8px' }}
    // className='w-full h-[50px] flex justify-between items-center px-[8px]'
    >
      <button style={{border: 'none', backgroundColor: 'transparent'}}>
        <img src="logo.png" alt="logo" style={{ width: 30, height: 30, objectFit: 'fill',  }} />
      </button>
      <Search
        placeholder="Search..."
        onSearch={onSearch}
        style={{
          width: 200,
        }}
        size='middle'
      />
    </div>
  );
};
export default MainHeader;