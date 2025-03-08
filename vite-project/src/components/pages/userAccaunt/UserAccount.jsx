import  { useState } from "react";
import Header from "../Header"; 

const UserAccount = () => {
  const [isSearchVisible, setSearchVisible] = useState(false);

  return (
    <div>
      <Header isSearchVisible={isSearchVisible} setSearchVisible={setSearchVisible} />
      
      {isSearchVisible && (
        <div className="fixed top-20 left-[70%] z-50">
          <div className="relative">
            <input
              type="text"
              placeholder="Поиск..."
              className="p-3 w-[350px] bg-black text-white border rounded-md pl-10"
            />
          </div>
        </div>
      )}
    </div>
  );
};


export default UserAccount;