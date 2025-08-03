import { API_PATHS } from '../util/apiPaths';
import { UserContext } from '../context/UserContext';
import React, { useContext, useState } from 'react'
import {authStyles as styles} from '../assets/dummystyle'
import { useNavigate } from 'react-router-dom';
import { validateEmail } from '../util/helper';
import axiosInstance from '../util/axiosInstance';


import Input from './Input';
const SignUp = ({setCurrentPage}) => {
    const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();



    const handleSignUp= async (e)=>{
      e.preventDefault(); 
        if(!fullName){
            setError("please enter fullname")
            return;
        }
        if(!validateEmail(email)){
             setError("please enter valid email")
            return;
        }
        if(!password){
             setError("please enter password")
            return;
        }
        setError('');
        try{
            const response=await axiosInstance.post(API_PATHS.AUTH.RAGISTER,{
            name:fullName,
            email,
            password});
            const {token}=response.data;
            if(token){
                localStorage.setItem('token',token);
                updateUser(response.data);
                navigate('/dashboard');
            }
        } 
        catch (error){
            setError(error.response?.data?.message||"something went wrong")
        } 


    }
  return (
    <div className={styles.signupContainer}>
        <div className={styles.headerWrapper}>
            <h3 className={styles.signupTitle}>Create Account</h3>
           <p className={styles.signupSubtitle}>join thousands of professional</p>
        </div>
   {/*FORM*/}
   <form onSubmit={handleSignUp} className={styles.signupForm}>
        <Input value={fullName} onChange={({target})=>setFullName(target.value)}
        label="full NAME"
        placeholder='john doe'
        type ='text'/>
          <Input value={email} onChange={({target})=>setEmail(target.value)}
        label="email"
        placeholder='example.com'
        type ='email'/>
          <Input value={password} onChange={({target})=>setPassword(target.value)}
        label="Password"
        placeholder='min 8 charecater'
        type ='password'/>
        {error&&<div className={styles.errorMessage}>{error}</div>}
        <button type='submit' className={styles.signupSubmit}>
            Create Account
        </button>
        {/*FOOTER*/}
        <p className={styles.switchText}>
            Already have an sccount?{' '}
            <button onClick={()=>setCurrentPage('login')}
            type='button' className={styles.signupSwitchButton}>
                Sign IN
            </button>
        </p>
   </form>
    </div>
  )
}

export default SignUp