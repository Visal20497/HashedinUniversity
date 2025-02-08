import React, { useEffect, useState } from 'react';
import './Profile.css';
import { useProfile } from '../../context/ProfileContext';
import {
  error,
  Profile_Filed_Required,
  Profile_Popup_Message,
  Required,
  Required_,
} from '../../Utils/Contant';
import Popup from '../Popup/Popup';

const Profile: React.FC = () => {
  const { profileSave, setProfileSave } = useProfile();
  // const [profile, setProfile] = useState({
  //   displayName: '',
  //   firstName: '',
  //   lastName: '',
  //   about: '',
  //   areaOfInterest: '',
  //   role: '',
  //   experience: '',
  //   expertise: '',
  //   profilePicture: '',
  //   manageRole: '',
  // });
  const [profile, setProfile] = useState(profileSave);
  const [isFormValid, setIsFormValid] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const Error = error;
  const [errors, setErrors] = useState({
    displayName: '',
    firstName: '',
    lastName: '',
    manageRole: '',
    profilePicture: '',
    experience: '',
    expertise: '',
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfile((prevProfile) => ({
          ...prevProfile,
          profilePicture: event.target?.result as string,
        }));
        setErrors((prevErrors) => ({
          ...prevErrors,
          profilePicture: '',
        }));
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        profilePicture: Required,
      }));
    }
  };

  const validateInput = (name: string, value: string) => {
    let error = '';
    switch (name) {
      case 'displayName':
        if (!/^[a-zA-Z0-9_]{3,15}$/.test(value)) {
          error = Error.displayName;
        }
        break;
      case 'firstName':
        if (!/^[a-zA-Z]{2,30}$/.test(value)) {
          error = Error.firstName;
        }
        break;
      case 'lastName':
        if (!/^[a-zA-Z]{2,30}$/.test(value)) {
          error = Error.lastName;
        }
        break;
      case 'about':
        if (value.length > 200) {
          error = Error.about;
        }
        break;
      case 'manageRole':
        if (!/^[a-zA-Z0-9 ]{2,30}$/.test(value)) {
          error = Error.manageRole;
        }
        break;
      case 'experience':
        if (profile.role === 'professional' && !value) {
          error = Error.experience;
        }
        break;
      case 'expertise':
        if (profile.role === 'professional' && !value) {
          error = Error.expertise;
        }
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    const error = validateInput(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
    if (errors) {
      setShowError(true);
    }
  };

  const checkFormValidity = () => {
    const requiredFields = ['displayName', 'firstName', 'lastName'];
    let isValid = true;

    for (let i = 0; i < requiredFields.length; i++) {
      const field = requiredFields[i];
      if (!profile[field as keyof typeof profile]) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [field]: Required_,
        }));
        isValid = false;
      }
    }
    if (profile.role === 'professional') {
      if (!profile.experience || errors.experience) {
        if (!profile.expertise || errors.expertise) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            expertise: Required_,
            experience: Required_,
          }));
          isValid = false;
        }
        if (!profile.manageRole || errors.manageRole) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            manageRole: Required_,
            experience: Required_,
          }));
          isValid = false;
        }

        setErrors((prevErrors) => ({
          ...prevErrors,
          experience: Required_,
        }));
        isValid = false;
      }
      if (!profile.expertise || errors.expertise) {
        if (!profile.experience || errors.experience) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            experience: Required_,
            expertise: Required_,
          }));
          isValid = false;
        }
        if (!profile.manageRole || errors.manageRole) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            manageRole: Required_,
            expertise: Required_,
          }));
          isValid = false;
        }
        setErrors((prevErrors) => ({
          ...prevErrors,
          expertise: Required_,
        }));
        isValid = false;
      }
      if (!profile.manageRole || errors.manageRole) {
        if (!profile.experience || errors.experience) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            experience: Required_,
            manageRole: Required_,
          }));
          isValid = false;
        }
        if (!profile.expertise || errors.expertise) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            manageRole: Required_,
            expertise: Required_,
          }));
          isValid = false;
        }
        setErrors((prevErrors) => ({
          ...prevErrors,
          manageRole: Required_,
        }));
        isValid = false;
      }
    }
    if (!profile.profilePicture) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        profilePicture: Required_,
      }));
      isValid = false;
    }
    return isValid;
  };
  const handleSave = (event: React.FormEvent) => {
    event.preventDefault();
    if (isFormValid) {
      setShowPopup(true);
      setPopupMessage(Profile_Popup_Message);
      setProfileSave(profile);
      setErrors({
        displayName: '',
        firstName: '',
        lastName: '',
        manageRole: '',
        profilePicture: '',
        experience: '',
        expertise: '',
      });
      setShowError(false);
    } else {
      alert(Profile_Filed_Required);
    }
  };
  const handleClosePopup = () => {
    setShowPopup(false);
  };
  useEffect(() => {
    const isValid = checkFormValidity();
    if (isValid !== isFormValid) {
      setIsFormValid(isValid);
    }
  }, [profile]);

  return (
    <div className="profile-container">
      <div className="profile-picture">
        {profile.profilePicture ? (
          <img
            src={profile.profilePicture}
            alt="Profile"
            className="profile-img"
          />
        ) : (
          <label className="upload-label">
            Upload Profile Picture
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {errors.profilePicture && showError && (
              <p className="error">{errors.profilePicture}</p>
            )}
          </label>
        )}
      </div>
      <div className="profile-form">
        <form>
          <div className="form-group form-first-line">
            <div className="form-group">
              <label htmlFor="displayName">Display Name</label>
              <input
                type="text"
                id="displayName"
                placeholder="Add display name"
                name="displayName"
                value={profile.displayName}
                onChange={handleChange}
              />
              {errors.displayName && showError && (
                <p className="error">{errors.displayName}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                placeholder="Add first name"
                name="firstName"
                value={profile.firstName}
                onChange={handleChange}
              />
              {showError && errors.firstName && (
                <p className="error">{errors.firstName}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                placeholder="Add last name"
                name="lastName"
                value={profile.lastName}
                onChange={handleChange}
              />
              {showError && errors.lastName && (
                <p className="error">{errors.lastName}</p>
              )}
            </div>
          </div>
          <div className={`form-group ${showError ? 'form-about' : ''}`}>
            <label htmlFor="about">About Yourself</label>
            <textarea
              id="about"
              placeholder="Add about yourself"
              name="about"
              value={profile.about}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="form-group">
            <label>Area of Interest</label>
            <div>
              <label>
                <input
                  type="checkbox"
                  name="areaOfInterest"
                  value="developer"
                  checked={profile.areaOfInterest === 'developer'}
                  onChange={handleChange}
                />
                Developer
              </label>
              <label>
                <input
                  type="checkbox"
                  name="areaOfInterest"
                  value="designer"
                  checked={profile.areaOfInterest === 'designer'}
                  onChange={handleChange}
                />
                Designer
              </label>
              <label>
                <input
                  type="checkbox"
                  name="areaOfInterest"
                  value="manager"
                  checked={profile.areaOfInterest === 'manager'}
                  onChange={handleChange}
                />
                Manager
              </label>
              <label>
                <input
                  type="checkbox"
                  name="areaOfInterest"
                  value="sales"
                  checked={profile.areaOfInterest === 'sales'}
                  onChange={handleChange}
                />
                Sales
              </label>
            </div>
          </div>
          <div className="form-group">
            <label>Are you a Student or Professional?</label>
            <div>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={profile.role === 'student'}
                  onChange={handleChange}
                />
                Student
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="professional"
                  checked={profile.role === 'professional'}
                  onChange={handleChange}
                />
                Professional
              </label>
            </div>
          </div>
          {profile.role === 'professional' && (
            <div className="Additional-details">
              {profile.role === 'professional' && (
                <div className="form-group">
                  <label>How much experience do you have?</label>
                  <div className="opt">
                    <label>
                      <input
                        type="radio"
                        name="experience"
                        value="0-5"
                        checked={profile.experience === '0-5'}
                        onChange={handleChange}
                      />
                      0-5
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="experience"
                        value="5-10"
                        checked={profile.experience === '5-10'}
                        onChange={handleChange}
                      />
                      5-10
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="experience"
                        value="10+"
                        checked={profile.experience === '10+'}
                        onChange={handleChange}
                      />
                      10&Above
                    </label>
                  </div>
                </div>
              )}
              {profile.role === 'professional' && (
                <div className="form-group">
                  <label>What is your expertise?</label>
                  <div className="opt">
                    <label>
                      <input
                        type="radio"
                        name="expertise"
                        value="java"
                        checked={profile.expertise === 'java'}
                        onChange={handleChange}
                      />
                      Java
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="expertise"
                        value="react"
                        checked={profile.expertise === 'react'}
                        onChange={handleChange}
                      />
                      React
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="expertise"
                        value="backend"
                        checked={profile.expertise === 'backend'}
                        onChange={handleChange}
                      />
                      Backend
                    </label>
                  </div>
                </div>
              )}
              {
                <div className="form-group">
                  <label htmlFor="ManageRole">Manage your role</label>
                  <input
                    type="text"
                    placeholder="Add your role"
                    id="manageRole"
                    name="manageRole"
                    value={profile.manageRole}
                    onChange={handleChange}
                  />
                  {showError && errors.manageRole && (
                    <p className="error">{errors.manageRole}</p>
                  )}
                </div>
              }
            </div>
          )}
          <div className="button-container">
            <button
              className="save-button"
              onClick={handleSave}
              disabled={!isFormValid}
            >
              Save
            </button>
          </div>
        </form>
      </div>
      <Popup
        message={popupMessage}
        isVisible={showPopup}
        onClose={handleClosePopup}
      />
    </div>
  );
};

export default Profile;
