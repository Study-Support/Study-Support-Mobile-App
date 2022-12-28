const register_options = [
  {
    id: 0,
    label: 'STUDENT',
  },
  {
    id: 1,
    label: 'TUTOR',
  },
];

const walkthrough = [
  {
    id: 0,
    title: 'Explore Online Courses',
    sub_title:
      'All types of educational & professional courses available online.',
    image: require('../assets/images/work.png'),
  },
  {
    id: 1,
    title: 'Explore Online Courses',
    sub_title:
      'All types of educational & professional courses available online.',
    image: require('../assets/images/work.png'),
  },
  {
    id: 2,
    title: 'Explore Online Courses',
    sub_title:
      'All types of educational & professional courses available online.',
    image: require('../assets/images/work.png'),
  },
];

const categories = [
  {
    id: 0,
    label: 'Mobile Design',
    icon: require('../assets/icons/mobile.png'),
  },
  {
    id: 1,
    label: '3D Modeling',
    icon: require('../assets/icons/model_3d.png'),
  },
  {
    id: 2,
    label: 'Web Designing',
    icon: require('../assets/icons/web_design.png'),
  },
  {
    id: 3,
    label: 'Illustrations',
    icon: require('../assets/icons/illustration.png'),
  },
  {
    id: 4,
    label: 'Drawing',
    icon: require('../assets/icons/drawing.png'),
  },
  {
    id: 5,
    label: 'Animation',
    icon: require('../assets/icons/animation.png'),
  },
  {
    id: 6,
    label: 'Education',
    icon: require('../assets/icons/education.png'),
  },
  {
    id: 7,
    label: 'Networking',
    icon: require('../assets/icons/networking.png'),
  },
  {
    id: 8,
    label: 'Coding',
    icon: require('../assets/icons/coding.png'),
  },
];

const screens = {
  home: 'Home',
  search: 'Search',
  profile: 'Profile',
};

const bottom_tabs = [
  {
    id: 0,
    label: screens.home,
    icon: require('../assets/icons/home.png'),
  },
  {
    id: 1,
    label: screens.search,
    icon: require('../assets/icons/search.png'),
  },
  {
    id: 2,
    label: screens.profile,
    icon: require('../assets/icons/profile.png'),
  },
];

const class_types = [
  {
    id: 0,
    is_mentor: 0,
    accepted: 1,
    label: 'Thành Viên',
    icon: require('../assets/icons/original.png'),
  },
  {
    id: 1,
    is_mentor: 1,
    accepted: 1,
    label: 'Mentor',
    icon: require('../assets/icons/staff_pick.png'),
  },
];

const class_levels = [
  {
    id: 3,
    status: 0,
    is_creator: 1,
    label: 'Nhu Cầu Tạo Nhóm',
    icon: require('../assets/icons/original.png'),
  },
  {
    id: 4,
    status: 1,
    is_creator: 0,
    label: 'Yêu Cầu Là Thành Viên',
    icon: require('../assets/icons/all.png'),
  },
  {
    id: 5,
    status: 2,
    is_creator: null,
    label: 'Yêu Cầu Là Mentor',
    icon: require('../assets/icons/all.png'),
  },
];

const course_details_tabs = [
  {
    id: 0,
    label: 'Chapters',
  },
  {
    id: 1,
    label: 'Files',
  },
  {
    id: 2,
    label: 'Discussions',
  },
];

export default {
  register_options,
  walkthrough,
  categories,
  screens,
  bottom_tabs,
  class_types,
  class_levels,
  // created_within,
  course_details_tabs,
};
