const ProfileSettings = () => {
  return (
    <div>
      <h2>Profile Settings</h2>
      <form>
        <div>
          <label>Notification Preferences:</label>
          <input type="checkbox" id="notifications" />
          <label htmlFor="notifications">Enable notifications</label>
        </div>
        <button type="submit">Save Settings</button>
      </form>
    </div>
  );
};

export default ProfileSettings;