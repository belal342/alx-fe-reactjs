const UserProfile = (props) => {
  return (
    <div style={{
      border: '1px solid silver',
      borderRadius: '5px',
      padding: '15px',
      margin: '10px 0',
      backgroundColor: 'white',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{
        color: 'royalblue',
        marginTop: '0',
        borderBottom: '1px solid gainsboro',
        paddingBottom: '8px'
      }}>{props.name}</h2>
      <p style={{ margin: '8px 0', color: 'dimgray' }}>
        Age: <span style={{ fontWeight: 'bold', color: 'forestgreen' }}>{props.age}</span>
      </p>
      <p style={{ color: 'darkslategray', fontStyle: 'italic' }}>Bio: {props.bio}</p>
    </div>
  );
};

export default UserProfile;