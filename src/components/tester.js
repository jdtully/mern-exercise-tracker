<div>
  <h3>Create New User</h3>
  <form onSubmit={this.onSubmit}>
    <div className="form-group">
      <label>Username: </label>
      <input
        type="text"
        required
        className="form-control"
        value={this.state.username}
        onChange={this.onChangeUsername}
      />
    </div>
    <div className="form-group">
      <input type="submit" value="Create User" className="btn btn-primary" />
    </div>
  </form>
</div>;
