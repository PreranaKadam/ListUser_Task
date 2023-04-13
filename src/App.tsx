import React, { useEffect, useState } from 'react';
import './App.css';
import data from './json/celebrities.json';
import { useDispatch, useSelector } from 'react-redux';
import deleteicon from "./images/delete.svg";
import editicon from "./images/edit.png";
import open from "./images/plus.png";
import closed from "./images/minus.png";
import { UpdateSelectedUser, fetchDataSuccess, isEditing } from './HomeSlice';
import Delete from './components/Delete';
import Edit from './components/Edit';
import { calculateAge } from './components/commonfunction';

function App() {
  const [users, setUsers] = useState(data);
  const [activeIndex, setActiveIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const UsersData = useSelector((state: any) => state?.homeslice?.data);
  const isEditvalue = useSelector((state: any) => state?.homeslice?.isEditing);
  const SelectedUser = useSelector((state: any) => state.homeslice.selectedUser);
  const selectedUserID = UsersData?.find((user: any) => user.id === SelectedUser);

  const dispatch = useDispatch();

  useEffect(() => {
    setUsers(UsersData);
    dispatch(fetchDataSuccess(users));
  }, []);

  //For Handling delete activities
  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleClick = (id: any) => {
    setActiveIndex(activeIndex === id ? null : id);
    dispatch(UpdateSelectedUser(id));
  };

  // console.log(users);

  const handleEdit = () => {
    const userIndex = UsersData.findIndex((user: any) => user.id === SelectedUser);
    if (calculateAge(UsersData[userIndex].dob) >= 18) {
      dispatch(isEditing(true));
    } else {
      alert("User is not an adult and hence cannot be edited");
    }
  }

  const handleInputChange = (event: any) => {
    const query = event.target.value;
    setSearchQuery(query);
  }

  const filteredUsers = searchQuery ? UsersData.filter((user: any) =>
    user.first.toLowerCase().includes(searchQuery.toLowerCase())
  ) : null;

  const usersToRender = filteredUsers || UsersData;

  return (
    <>
      {isEditvalue ?
        <Edit /> :
        <div className="App">
          <div className="container">
            <h1>
              Users List
            </h1>
            <div className="main-search__text-box-wrapper">
              <i className="main-search__magnifying-glass">
                <svg height="30" viewBox="0 0 30 30" width="30" xmlns="http://www.w3.org/2000/svg"><path d="m12.1784138 21.3122241c-2.43872739 0-4.73283609-.9499163-6.45760394-2.6746841-1.72629015-1.7247679-2.67620642-4.0188766-2.67620642-6.4591262 0-2.43872739.94991627-4.73283609 2.67620642-6.45760394 1.72476785-1.72629015 4.01887655-2.67620642 6.45760394-2.67620642 2.4387273 0 4.732836.94991627 6.4576039 2.67620642 1.7262901 1.72476785 2.6762064 4.01887655 2.6762064 6.45760394 0 2.4402496-.9499163 4.7343583-2.6762064 6.4591262-1.7247679 1.7247678-4.0188766 2.6746841-6.4576039 2.6746841zm17.8215862 6.5352413-8.2082509-8.2097732c1.6562643-2.1251332 2.5650784-4.7206576 2.5650784-7.4592784 0-3.25315881-1.2680773-6.31146297-3.5682752-8.61013857-2.2986756-2.3017202-5.3569798-3.56827523-8.6101385-3.56827523-3.25315881 0-6.31146297 1.26655503-8.61013857 3.56827523-2.3001979 2.2986756-3.56827523 5.35697976-3.56827523 8.61013857 0 3.2531587 1.26807733 6.3114629 3.56827523 8.6101385 2.2986756 2.3017202 5.35697976 3.5682752 8.61013857 3.5682752 2.7386208 0 5.3341452-.9072918 7.4592784-2.5666007l8.2097732 8.2097732z"></path></svg>
              </i>
              <input type="search" className='searchbar' placeholder="Type here your search" value={searchQuery}
                onChange={handleInputChange} />
            </div>
          </div>
          <br></br>

          <div className="user-accordion">
            {usersToRender?.map((user: any, index: any) => (
              <div
                key={user.id}
                className='accordion-item'
              >
                <div className="accordion-title"><img src={user.picture} className='userpicture' />&nbsp;&nbsp;&nbsp;&nbsp;{user.first}&nbsp;{user.last}
                  <span onClick={() => handleClick(user.id)} className={`buttontag ${activeIndex === user.id ? "active" : ""
                    }`}>{activeIndex === user.id ? <img src={closed} className='collapseicons' /> : <img src={open} className='collapseicons' />}
                  </span>
                </div>
                {activeIndex === user.id && (
                  <div className="accordion-content">
                    <div className="grid-container1">
                      <p><span className='label'>Age</span> <br />{selectedUserID.age !== '' && selectedUserID.age === undefined ? calculateAge(user.dob) + " years" : (selectedUserID.age) + " years"}  </p>
                      <p><span className='label'>Gender</span> <br />{user.gender}</p>
                      <p><span className='label'>Country</span>  <br />{user.country}</p>
                    </div>
                    <div className="grid-container2">
                      <p><span className='label'>Description</span><br />{user.description}</p>
                    </div>
                    <div className='grid-container3'>
                      <img src={deleteicon} alt='delete' style={{ height: '30px' }} onClick={handleShowModal} />
                      <Delete showModal={showModal} handleCloseModal={handleCloseModal} />
                      <img src={editicon} alt='edit' style={{ height: '40px' }} onClick={handleEdit} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>}
    </>
  );
}

export default App;
