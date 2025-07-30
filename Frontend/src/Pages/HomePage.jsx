import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import RateLimitedUI from "../Components/RateLimitedUI";
import api from "../lib/axios";
import toast from "react-hot-toast";
import NoteCard from "../Components/NoteCard";
import NotesNotFound from "../Components/NotesNotFound";
import { PlusIcon } from "lucide-react";
import { Link } from "react-router";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [filteredNotes, setFilteredNotes] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(res.data);
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.log("Error Fetching Notes");
        console.log(error);
        if (error.response?.status == 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed To Load Notes");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  useEffect(() => {
    if (query.trim() === "") {
      setFilteredNotes(notes);
    } else {
      setFilteredNotes(
        notes.filter(
          (note) =>
            note.title.toLowerCase().includes(query.toLowerCase()) ||
            note.content.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  }, [query, notes]);

  return (
    <div className="min-h-screen">
      <Navbar setQuery={setQuery} />
      {isRateLimited && <RateLimitedUI />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-transparent z-50">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
            </div>
          </div>
        )}

        {!loading && notes.length === 0 && !isRateLimited && <NotesNotFound />}

        {filteredNotes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
        <Link
          to={"/create"}
          className="fixed right-3 bottom-3 sm:right-10 sm:bottom-10 btn btn-circle btn-primary shadow-lg hover:scale-110 transition-transform duration-200 md:size-20"
        >
          <PlusIcon className="w-8 h-8" />
        </Link>
      </div>
    </div>
  );
};

export default HomePage;