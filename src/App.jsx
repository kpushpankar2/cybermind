import React, { useEffect, useState } from 'react';
import Picker from './Assigner';
import Comments from './Comments';
import { events } from './constants';
import './index.css'
import ProfilePicker from './ProfileChoose';

function App() {
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [eventOfProfile, setEventOfProfile] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedEventDetails, setEditedEventDetails] = useState({});
  const name = localStorage.getItem('profile');
  const defaultEventTitle = 'Flower Arrangement';

  const defaultDate = '2024-12-25';
  const defaultTimeRange = '8:00 - 10:00 AM';

  useEffect(() => {
    const filteredEvents = events.filter(event => event.assignedTo === name);
    setEventOfProfile(filteredEvents);

    const defaultEvent = filteredEvents.find(event => event.title === defaultEventTitle);
    if (defaultEvent) {
      setSelectedEventId(defaultEvent.id);
    } else if (filteredEvents.length > 0) {
      setSelectedEventId(filteredEvents[0].id);
    }
  }, [name]);

  useEffect(() => {
    if (selectedEventId) {
      const selectedEvent = eventOfProfile.find(event => event.id === selectedEventId);
      if (selectedEvent) {
        setEditedEventDetails({
          ...selectedEvent,
          date: selectedEvent.date || defaultDate,
          timeRange: selectedEvent.timeRange || defaultTimeRange,
        });
      }
    }
  }, [selectedEventId, eventOfProfile]);

  const selectedEvent = eventOfProfile.find(event => event.id === selectedEventId);

  const handleEditModeToggle = () => {
    setEditMode(!editMode);
    setEditedEventDetails({
      ...selectedEvent,
      date: selectedEvent.date || defaultDate,
      timeRange: selectedEvent.timeRange || defaultTimeRange,
    });
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setEditedEventDetails(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCompletionToggle = () => {
    setEditedEventDetails(prevState => ({
      ...prevState,
      completed: !prevState.completed,
    }));
  };

  const handleSaveChanges = () => {
    setEventOfProfile(prevEvents => {
      return prevEvents.map(event => {
        if (event.id === editedEventDetails.id) {
          return {
            ...event,
            title: editedEventDetails.title,
            date: editedEventDetails.date,
            timeRange: editedEventDetails.timeRange, // Update timeRange
          };
        }
        return event;
      });
    });
    setEditMode(false);
  };

  return (
    <div className="w-screen min-h-screen flex items-center justify-center p-4 bg-gray-100">
      {selectedEvent ? (
        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
          <div className="flex w-full justify-between items-center mb-4">
            <img src="/cc.png" alt="CC" className="cursor-pointer h-4 w-4 object-fit" />
            <div className="flex space-x-2 items-center text-red-300">
              <img src="/bin.png" alt="Bin" className="cursor-pointer h-4 w-4 object-fit" />
              <img src="/close.png" alt="Close" className="cursor-pointer h-2.5 object-fit" onClick={() => setSelectedEventId(null)} />
            </div>
          </div>
          {editMode ? (
            <div>
              <div className="space-y-2 mb-4">
                <input
                  type="text"
                  name="title"
                  value={editedEventDetails.title}
                  onChange={handleInputChange}
                  className="bg-white py-2 px-4 rounded-full font-medium border w-full"
                />
                <div className="bg-white py-2 px-4 rounded-full font-medium border flex items-center space-x-2">
                  <img src="/calendar.png" className="h-4 w-4" alt="Calendar" />
                  <input
                    type="date"
                    name="date"
                    value={editedEventDetails.date}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border-gray-200 shadow-sm outline-none border p-2"
                  />
                  <input
                    type="text"
                    name="timeRange"
                    value={editedEventDetails.timeRange}
                    onChange={handleInputChange}
                    placeholder="Time Range"
                    className="w-full rounded-lg border-gray-200 shadow-sm outline-none border p-2"
                  />
                </div>
                
              </div>
              <button className="bg-red-500 text-white py-2 px-2 rounded-full" onClick={handleSaveChanges}>Save</button>
            </div>
          ) : (
            <div className="space-y-2 mb-4">
              <h3 className="bg-white py-2 px-4 rounded-full text-red-600 font-semibold border text-lg">
                {selectedEvent.title}
              </h3>
              <div className="bg-white py-2 px-4 rounded-full font-medium border flex items-center space-x-2">
                <img src="/calendar.png" className="h-4 w-4" alt="Calendar" />
                <h4>{selectedEvent.date || defaultDate}</h4>
                <h4>{selectedEvent.timeRange || defaultTimeRange}</h4>
              </div>
            </div>
          )}
<div className="flex justify-end ">
  <button onClick={handleEditModeToggle} className="text-sm text-blue-500 cursor-pointer px-4 py-2 rounded-full bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
    Edit
  </button>
</div>

          <div className="bg-white py-2 px-4 rounded-full font-medium border-none mb-4 flex items-center space-x-2">
            <img src="/user.png" className="h-4 w-4" alt="User" />
            <h4 className="italic">Assign&nbsp;to:</h4>
            <Picker />
          </div>
          <div className="bg-white py-2 px-4 rounded-full font-medium border-none mb-4 flex">
            <div className="flex items-center gap-x-3 mt-2">
              <img src="/note.png" className="h-4 w-4" alt="Note" />
              <h4 className="italic mr-8" >Note:</h4>
            </div>
            <textarea
      id="OrderNotes"
      className="mt-2 w-full rounded-full border-gray-200 shadow-sm sm:text-sm outline-none border p-2 text-center overflow-hidden"
      rows="2"
       defaultValue="09382049832 www.flowervendor.com"
       style={{ resize: 'none', height: '60px' , textAlign:'center'}}
   />

          </div>
          <hr className="mb-4" />
          <h1 className="mb-2">Comments</h1>
          <Comments data={selectedEvent.comments} />
          {!editMode && (
            <div className="flex items-center justify-between mt-4">
              <label htmlFor="completed" className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  id="completed"
                  checked={selectedEvent.completed}
                  onChange={handleCompletionToggle}
                />
                <span className="text-sm">Mark as Complete</span>
              </label>
            </div>
          )}
        </div>
      ) : (
        <div className="w-full max-w-md space-y-4">
          {eventOfProfile.map(event => (
            <button
              key={event.id}
              onClick={() => setSelectedEventId(event.id)}
              className="bg-slate-200 rounded w-full"
            >
              <div className="flex flex-row px-4 py-8 sm:px-6">
                <img className="mr-2 flex h-8 w-8 rounded-full sm:mr-4" src={event.avatar} alt={event.title} />
                <div className="flex max-w-3xl items-center">
                  <p>{event.title}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
