/* eslint-disable react/jsx-filename-extension */
import SocialGithubIcon from 'grommet/components/icons/base/SocialGithub';
import SocialFacebookOptionIcon from 'grommet/components/icons/base/SocialFacebookOption';
import SocialLinkedinIcon from 'grommet/components/icons/base/SocialLinkedin';
import SocialTwitterIcon from 'grommet/components/icons/base/SocialTwitter';
import React from 'react';

const data = {
  profileOfOtherUser: {
    id: 1,
    username: 'kbrsh',
    name: 'Kabir Shah',
    profession: 'Software Engineer',
    bio: 'I make things.',
    socialLinks: [
      {
        id: 1,
        title: 'github',
        link: 'https://github.com/kbrsh',
        icon: <SocialGithubIcon />,
      },
      {
        id: 2,
        title: 'facebook',
        link: null,
        icon: <SocialFacebookOptionIcon />,
      },
      {
        id: 3,
        title: 'linkedin',
        link: null,
        icon: <SocialLinkedinIcon />,
      },
      {
        id: 4,
        title: 'twitter',
        link: 'https://twitter.com/kbrshah',
        icon: <SocialTwitterIcon />,
      },
    ],
    website_link: 'https://kabir.ml',
    profile_pic: 'https://avatars1.githubusercontent.com/u/15644571?v=4&s=460',
    projects: [
      {
        id: 1,
        title: 'Moon',
        description: 'A minimal, blazing fast user interface library.',
        github_link: 'https://github.com/kbrsh/moon',
        website_link: 'http://moonjs.ga/',
        images: ['https://sj.uploads.im/l9IXF.png'],
        stack: ['javascript', 'gulp', 'karma', 'mocha', 'chai', 'node', 'react', 'angularjs'],
      },
      {
        id: 2,
        title: 'Wing',
        description: 'A beautiful CSS framework designed for minimalists.',
        github_link: 'https://github.com/kbrsh/wing',
        website_link: 'http://usewing.ml/',
        images: [
          'https://sj.uploads.im/omSs2.png',
          'https://sl.uploads.im/94Bmq.png',
          'https://sm.uploads.im/EMAsF.png',
        ],
        stack: ['css', 'gulp'],
      },
      {
        id: 3,
        title: 'Personal Blog',
        description: 'My personal blog written with handlebars.',
        github_link: 'https://github.com/kbrsh/blog',
        website_link: 'https://blog.kabir.ml/',
        images: ['https://sm.uploads.im/sFbXU.png'],
        stack: ['javascript', 'css', 'handlebars'],
      },
    ],
  },
  bounties: [
    {
      id: 1,
      title: 'Make a project',
      description: 'Make it not suck',
      price: 1000.50,
      images: 'https://www.cats.com, https://www.reddit.com',
      stack: 'javascript, heroku, node'
    },
    {
      id: 2,
      title: 'Build a ecommerce app',
      description: 'an app that allows you to buy and sell used turkey basters',
      price: 0.99,
      images: 'https://turkey.com, https://foodnetwork.com',
      stack: 'python, apache, mithril'
    },
  ],
};

export default data;
