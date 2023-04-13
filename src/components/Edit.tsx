import { useDispatch, useSelector } from "react-redux";
import { blockInvalidChar, calculateAge } from "./commonfunction";
import save from "../images/save.svg";
import cancel from "../images/cancel.svg";
import { useState } from "react";
import { fetchDataSuccess, isEditing } from "../HomeSlice";

const Edit = () => {
    const UsersData = useSelector((state: any) => state?.homeslice?.data);
    const SelectedUser = useSelector((state: any) => state.homeslice.selectedUser);
    const dispatch = useDispatch();
    
    const handleCloseModal = () => {
        dispatch(isEditing(false));
    };

    const selectedUserID = UsersData.find((user:any) => user.id === SelectedUser);

    const [age, setAge] = useState(selectedUserID.age);
    const [first, setFirstName] = useState(selectedUserID.first);
    const [last, setLastName] = useState(selectedUserID.last);
    const [gender, setGender] = useState(selectedUserID.gender);
    const [country, setCountry] = useState(selectedUserID.country);
  
    const handleAgeChange = (event:any) => {
      setAge(event.target.value);
    };
    const handlefirstNameChange = (event:any) => {
        setFirstName(event.target.value);
    };
    const handleLastNameChange = (event:any) => {
        setLastName(event.target.value);
    };
    const handleGenderChange = (event:any) => {
      setGender(event.target.value);
    };
    const handleCountryChange = (event:any) => {
      setCountry(event.target.value);
    };
  
    const handleSaveClick = () => {
      const updatedUser = { ...selectedUserID, age,first,last, gender, country };
    const updatedUsers = UsersData.map((user:any) => {
      if (user.id === selectedUserID.id) {
        return updatedUser;
      }
      return user;
    });
    dispatch(fetchDataSuccess(updatedUsers));
    dispatch(isEditing(false));
    };


    return (
        <>
            <div className="user-accordion">
                {UsersData?.map((user: any, index: any) => (
                    <div
                        key={user.id}
                        className='accordion-item'
                    >
                    <div className="accordion-title"><img src={user.picture} />&nbsp;&nbsp;&nbsp;&nbsp;{SelectedUser != user.id ? (`${user.first} ${user.last}`):''}
                    {SelectedUser === user.id &&
                    <input type="text" className="inputtag" placeholder={`${user.first} ${user.last}`} onChange={handlefirstNameChange} required/>}
                        
                        {SelectedUser === user.id && (
                            <div className="accordion-content">
                                <div className="grid-container1">
                                    <p><span className='label'>Age</span><br />
                                        <input type='number' className="inputtag" placeholder={calculateAge(user.dob) +" "+ "years"} onChange={handleAgeChange} required/>
                                    </p>
                                    <p><span className='label'>Gender</span> <br />
                                    <select className="inputtag" onChange={handleGenderChange} required>
                                        <option value="" selected hidden>{user.gender}</option>
										<option value='male'>Male</option>
										<option value='female'>Female</option>
										<option value='transgender'>Transgender</option>
										<option value='rather not say'>Rather not say</option>
                                        <option value='other'>Other</option>
									</select></p>
                                    <p><span className='label'>Country</span>  <br />
                                    <input type="text" className="inputtag" onKeyDown={blockInvalidChar} placeholder={user.country} onChange={handleCountryChange} required/></p>
                                </div>
                                <div className="grid-container2">
                                    <p><span className='label'>Description</span><br />
                                    <textarea className='descriptionfield' placeholder={user.description} required/></p>
                                </div>
                                <div className='grid-container3'>
                                    <img src={cancel} style={{height:'45px'}} alt='cancel' onClick={handleCloseModal}/>
                                    <img src={save} alt='save' onClick={handleSaveClick}/>
                                </div>
                            </div>
                        )}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Edit;
