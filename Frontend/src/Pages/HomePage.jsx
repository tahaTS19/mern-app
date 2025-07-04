import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import RateLimitedUI from '../Components/RateLimitedUI';
import axios from "axios";
import toast from "react-hot-toast";
import NoteCard from "../Components/NoteCard";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/notes");
        console.log(res.data);
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.log("Error Fetching Notes");
        console.log(error);
        if(error.response?.status == 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed To Load Notes");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchNotes();
  },[])

  return <div className='min-h-screen'>
    <Navbar/>

    {isRateLimited && <RateLimitedUI />}

    <div className='max-w-7xl mx-auto p-4 mt-6'>
      {loading && <div className='text-center text-primary py-10'>Loading Notes...</div>}

      {notes.length > 0 && !isRateLimited && (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {notes.map(note => (
            <NoteCard key={note._id} note={note} />
          ))}
        </div>
      )}
    </div>
  </div>;
};

export default HomePage;
