// components/projects/ProjectList.js

import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import AddProject from './AddProject';

export default class ProjectList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      listOfProjects: []
    };
  }

  getAllProjects = () => {
    axios.get(`http://localhost:5000/api/projects`, { withCredentials: true })
      .then(responseFromApi => {
        this.setState({
          isLoading: false,
          listOfProjects: responseFromApi.data
        })
      })
  }

  handleAdd = (project) => {
    this.setState({
      listOfProjects: [...this.state.listOfProjects, project]
    })
  }

  componentDidMount() {
    this.getAllProjects();
  }

  render() {
    return (
      <div>
        <div style={{ width: '60%', float: "left" }}>
          {this.state.isLoading && <div>Loading...</div>}
          {this.state.listOfProjects.map((project, index) => {
            return (
              <div key={project._id}>
                <Link to={`/projects/${project._id}`}>
                  <h3>{project.title}</h3>
                </Link>
                <p style={{ maxWidth: '400px' }} >{project.description} </p>
              </div>
            )
          })
          }
        </div>
        <div style={{ width: '40%', float: "right" }}>
          <AddProject
            getData={() => this.getAllProjects()}
            onAdd={this.handleAdd}
          />
        </div>
      </div>
    )
  }
}
