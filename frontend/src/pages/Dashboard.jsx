import React, { useEffect, useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import { dashboardStyles as styles } from '../assets/dummystyle'
import { LucideFilePlus, LucideTrash2 } from 'lucide-react'
import axios from 'axios'
import axiosInstance from '../util/axiosInstance'
import { API_PATHS } from '../util/apiPaths'
import toast from 'react-hot-toast' 
import { ResumeSummaryCard } from '../components/Cards'
import moment from 'moment'
import Modal from '../components/Modal'
import CreateResumeForm from '../components/CreateResumeForm'
import { useLocation, useNavigate } from 'react-router-dom'
//import { Navigate } from 'react-router-dom'




const Dashboard = () => {
  const [openCreateModal, setopenCreateModal] = useState(false)
  const [allResumes, setallResumes] = useState([])
  const [loading, setloading] = useState(true)
  const [resumeToDelete, setresumeToDelete] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); 
  const fetchAllResumes = async () => {
    try {
      setloading(true)
      const response = await axiosInstance.get(API_PATHS.RESUME.GET_ALL)
      //aADD COMPLETION
      const resumeswithCompletion = response.data.map(resume => ({
        ...resume,
        completion: 0
      }))
      setallResumes(resumeswithCompletion)
    }

    catch (error) {
      console.error('error fetching resume', error)
    }
    finally {
      setloading(false)
    }


  }
  useEffect(() => {
    fetchAllResumes();
    
  }, [])

   const handleDeleteResume=async()=>{

   if(!resumeToDelete)
    return
  try{
    await axiosInstance.delete(API_PATHS.DELETE(resumeToDelete))
    toast.success('Resume deleted successfully')
    fetchAllResumes()
  }
  catch(error){
             console.error('error deleting resu,e',error)
             toast.error('failed to delete resume')
  }
  finally{
    setresumeToDelete(null)
    showDeleteConfirm(false)
  }


   }
   const handleDeleteClick=(id)=>{
    setresumeToDelete(id)
    setShowDeleteConfirm(true)

   }



  return (
    <div>
      <DashboardLayout>
        <div className={styles.container}>
          <div className={styles.headerWrapper}>
            <div>
              <h1 className={styles.headerTitle}>My Resume</h1>
              <p className={styles.headerSubtitle}>
                {allResumes.length > 0
                  ? `You have ${allResumes.length} resume${allResumes.length !== 1 ? 's' : ''}`
                  : 'Start building your professional resumes'}
              </p>
            </div>
            <div className='flex gap-4' >
              <button className={styles.createButton} onClick={() => setopenCreateModal(true)}>
                <div className={styles.createButtonOverlay}></div>
                <span className={styles.createButtonContent}>
                  Create Now
                  <LucideFilePlus className="group-hover:translate-x-1 transition-all duration-300 ml-2" />
                </span>
              </button>

            </div>
          </div>
          {/*LOADING STATE*/}
          {loading && (
            <div className={styles.spinnerWrapper}>
              <div className={styles.spinner}></div>

            </div>

          )}
          {!loading && allResumes.length === 0 && (
            <div className={styles.emptyStateWrapper}>
              <div className={styles.emptyIconWrapper}>
                <LucideFilePlus size={32} className='text-violet-600' />
              </div>
              <h3 className={styles.emptyTitle}>No Resumes Yet</h3>

              <p className={styles.emptyText}>
                You haven't created any resumes yet. Start building your professional resume to land your dream job.
              </p>
              <button className={styles.createButton} onClick={()=>setopenCreateModal(true)}>
                <div className={styles.createButtonOverlay}>
                </div>
                <span className={styles.createButtonContent}>
                  Create YOUR first Resume
                   <LucideFilePlus className="group-hover:translate-x-1 transition-all duration-300 ml-2" size={20} />
                </span>

              </button>
            </div>
          )}
          {/*GRID VIEW*/}
          {!loading && allResumes.length > 0 && (
  <div className={styles.grid}>
    {/* Create New Resume Card */}
    <div className={styles.newResumeCard} onClick={() => setopenCreateModal(true)}>
      <div className={styles.newResumeIcon}>
        <LucideFilePlus size={32} className="text-white" />
      </div>
      <h3 className={styles.newResumeTitle}>Create New Resume</h3>
      <p className={styles.newResumeText}>Start building your career</p>
    </div>

    {/* Render Each Resume Card */}
    {allResumes.map((resume) => (
      <ResumeSummaryCard key={resume._id} imgUrl={resume.thumbnailLink}
      title={resume.title} createAt={resume.createAt} updateAt={resume.updateAt}
      onSelect={()=>navigate(`/resume/${resume._id}`)}
      onDelete={()=>handleDeleteClick(resume._id)}
      completion={0}
      isPremium={resume.isPremium}
      isNew={moment().diff(moment(resume.createdAt),'days')<7}
/>
    ))}
  </div>
)}

        </div>
        {/*CREATE MODAL*/}
        <Modal isOpen={openCreateModal} onClose={()=>setopenCreateModal(false)}
        hideHeader maxWidth='max-w-2xl'>
          <div className='p-6'>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Create new Resume</h3>
             
             <button onClick={()=>setopenCreateModal(false)} className={styles.modalCloseButton}>
              x
        
             </button>

            </div>
            <CreateResumeForm onSuccess={()=>{
              setopenCreateModal(false);
              fetchAllResumes();
            }}/>
          </div>
        </Modal>
        {/*DELET MODAL*/}
        <Modal isOpen={showDeleteConfirm} onClose={()=>setShowDeleteConfirm(false)} title='Confirm delete'
        showActionBtn actionBtnText='Delete' actionBtnClassName='bg-red-600 hover:bg-red-700' onActionClick={handleDeleteResume}>
          <div className='p-4'>
            <div className='flex flex-col items-center text-center'>
              <div className={styles.deleteIconWrapper}>
                <LucideTrash2 className='text-orange-600' size={24}/>
              </div>

              <h3 className={styles.deleteTitle}>Delete Resume</h3>
              <p className={styles.deleteText}>
                Are you sure you want to delete this resume.
              </p>
            </div>
          </div>
        </Modal>
      </DashboardLayout>
    </div>
  )
}

export default Dashboard