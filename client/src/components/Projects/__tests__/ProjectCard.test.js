/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import ProjectCard from '../ProjectCard';

Enzyme.configure({ adapter: new Adapter() });

const project = {
  id: 1,
  profile_id: 1,
  order: 0,
  title: 'Test Project',
  description: 'Test description',
  github_link: 'https://github.com/test/project',
  website_link: 'http://test-project.com',
  stack: 'javascript, react, create react app, express, SCSS',
  images: 'https://firebasestorage.googleapis.com/v0/b/hackfolio-ed6a4.appspot.com/o/images%2F38fd20d0-90c2-447d-88f3-38e63c22cfd9.jpg?alt=media&token=89b7963f-4213-4d6d-9573-df6f01630c05',
  created_at: '2017-10-26T17:25:00.975Z'
};

it('renders ProjectCard without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<ProjectCard project={project} />, div);
});

test('title set correctly', () => {
  const component = mount(<ProjectCard project={project} />);
  const text = component.find('.title').text();

  expect(text).toEqual(project.title);
});

test('description set correctly', () => {
  const component = mount(<ProjectCard project={project} />);
  const text = component.find('.description h3').text();

  expect(text).toEqual(project.description);
});

test('stack renders tags into components', () => {
  const component = mount(<ProjectCard project={project} />);
  const numberOfStackTags = project.stack.split(',').length;
  const { length } = component.find('.stack').children();

  expect(length).toEqual(numberOfStackTags);
});

test('github link renders if link is set', () => {
  const component = mount(<ProjectCard project={project} />);
  const { length } = component.find('.githubLink a');

  expect(length).toEqual(1);
});

test('github link does not render if link is not set', () => {
  const githublessProject = Object.assign(project, { github_link: null });
  const component = mount(<ProjectCard project={githublessProject} />);
  const { length } = component.find('.githubLink a');

  expect(length).toEqual(0);
});

test('website link renders if link is set', () => {
  const component = mount(<ProjectCard project={project} />);
  const { length } = component.find('.websiteLink a');

  expect(length).toEqual(1);
});

test('website link does not render if link is not set', () => {
  const websitelessProject = Object.assign(project, { website_link: null });
  const component = mount(<ProjectCard project={websitelessProject} />);
  const { length } = component.find('.websiteLink a');

  expect(length).toEqual(0);
});

test('image renders if one image is set', () => {
  const component = mount(<ProjectCard project={project} />);
  const { length } = component.find('img');

  expect(length).toEqual(1);
});

test('image does not render if no image is set', () => {
  const imagelessProject = Object.assign(project, { images: '' });
  const component = mount(<ProjectCard project={imagelessProject} />);
  const { length } = component.find('img');

  expect(length).toEqual(0);
});

test('carousel renders if more than one image is set', () => {
  const imageheavyProject = Object.assign(project, { images: 'http://link1.com, http://link2.com, http://link3.com' });
  const component = mount(<ProjectCard project={imageheavyProject} />);
  const { length } = component.find('img');

  expect(length).toEqual(imageheavyProject.images.split(',').length);
});
