"use client";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";

const ProfilePage = () => {
    const {user} = useSelector((state: any) => state.auth); // Adjust the type according to your store structure
    const { _id, username, email, storeName } = user || {}; // Destructure user properties
    if (!user) {
        redirect('/login')

    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black">
        <h1>Profile Page</h1>
        <p>This is the profile page.</p>
        <p>You can view and edit your profile information here.</p>
        <div style={{ 
            border: "4px solid black", 
            padding: "20px", 
            backgroundColor: "#f5f5f5", 
            boxShadow: "10px 10px 0px 0px black", 
            maxWidth: "400px", 
            margin: "20px auto" 
        }}>
            <h2 style={{ marginBottom: "20px", textAlign: "center" }}>User Details</h2>
            <form style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <label style={{ display: "flex", flexDirection: "column", fontWeight: "bold" }}>
                    Name:
                    <input 
                        type="text" 
                        defaultValue={username} 
                        placeholder="Enter your name"
                        className="border-2 border-black p-2 text-black shadow-[inset_4px_4px_0px_0px_black] bg-white"
                    />
                </label>
                <label style={{ display: "flex", flexDirection: "column", fontWeight: "bold" }}>
                    Email:
                    <input 
                        type="email" 
                        defaultValue={email} 
                        style={{ 
                            border: "2px solid black", 
                            padding: "10px", 
                            backgroundColor: "#fff", 
                            boxShadow: "inset 4px 4px 0px 0px black" 
                        }} 
                    />
                </label>
                <label style={{ display: "flex", flexDirection: "column", fontWeight: "bold" }}>
                    Store Name:
                    <input 
                        type="text" 
                        defaultValue={storeName} 
                        style={{ 
                            border: "2px solid black", 
                            padding: "10px", 
                            backgroundColor: "#fff", 
                            boxShadow: "inset 4px 4px 0px 0px black" 
                        }} 
                    />
                </label>
                <button 
                    type="submit" 
                    style={{ 
                        border: "2px solid black", 
                        padding: "10px", 
                        backgroundColor: "#ffcc00", 
                        boxShadow: "4px 4px 0px 0px black", 
                        fontWeight: "bold", 
                        cursor: "pointer" 
                    }}
                >
                    Update
                </button>
            </form>
        </div>
        </div>
    );
    }   

export default ProfilePage;