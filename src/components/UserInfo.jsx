import React from 'react'

const UserInfo = ({ user }) => {
  const getInitials = (name) => {
    if (!name) return "";
    if (typeof name === "string") {
      return name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    return name[0]?.toUpperCase() || "";
  };

  return (
    <span title={typeof user === "string" ? user : user?.name || ""}>
      {getInitials(typeof user === "string" ? user : user?.name || "")}
    </span>
  );
}

export default UserInfo
