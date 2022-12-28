const categories = [
  {
    id: 0,
    title: 'Đại Cương',
    thumbnail: require('../assets/images/bg_1.png'),
  },
  {
    id: 1,
    title: 'Chuyên Ngành',
    thumbnail: require('../assets/images/bg_2.png'),
  },
  {
    id: 2,
    title: 'Tiếng Anh',
    thumbnail: require('../assets/images/bg_3.png'),
  },
  {
    id: 3,
    title: 'Thể Dục',
    thumbnail: require('../assets/images/bg_4.png'),
  },
  {
    id: 4,
    title: 'Lập Trình',
    thumbnail: require('../assets/images/bg_5.png'),
  },
  {
    id: 5,
    title: 'Tài Liệu Khác',
    thumbnail: require('../assets/images/bg_6.png'),
  },
];

const courses_list_1 = [
  {
    id: 0,
    title: 'Giải Tích 1',
    duration: '2 tuần',
    thanhvien: 1,
    mentor: 'Yes',
    thumbnail: require('../assets/images/giaitich1.png'),
    rating: 4.5,
  },
  {
    id: 1,
    title: 'Vật lí 1',
    duration: '8 tuần',
    thanhvien: 4,
    mentor: 'No',
    rating: 0,
    thumbnail: require('../assets/images/vatli.png'),
  },
  {
    id: 2,
    title: 'Giải Tích 2',
    duration: '9 tuần',
    thanhvien: 2,
    mentor: 'No',
    rating: 0,
    thumbnail: require('../assets/images/giaitich1.png'),
  },
];

const courses_list_2 = [
  {
    id: 0,
    title: 'Giải Tích 1',
    duration: '5 tuần',
    instructor: 'NhatQuang',
    ratings: 4.9,
    price: 5,
    is_favourite: true,
    thanhvien: 4,
    mentor: 'No',
    thumbnail: require('../assets/images/giaitich1.png'),
  },
  {
    id: 1,
    title: 'Vật lí 1',
    duration: '3 tuần',
    instructor: 'NhatQuang',
    ratings: 4.9,
    price: 5,
    is_favourite: true,
    thanhvien: 2,
    mentor: 'No',
    thumbnail: require('../assets/images/vatli.png'),
  },
  {
    id: 2,
    title: 'Vật lí 1',
    duration: '3 tuần',
    instructor: 'NhatQuang',
    ratings: 4.9,
    price: 5,
    is_favourite: true,
    thanhvien: 2,
    mentor: 'No',
    thumbnail: require('../assets/images/vatli.png'),
  },
  {
    id: 3,
    title: 'Vật lí 1',
    duration: '3 tuần',
    instructor: 'NhatQuang',
    ratings: 4.9,
    price: 5,
    is_favourite: true,
    thanhvien: 2,
    mentor: 'No',
    thumbnail: require('../assets/images/vatli.png'),
  },
  {
    id: 4,
    title: 'Vật lí 1',
    duration: '3 tuần',
    instructor: 'NhatQuang',
    ratings: 4.9,
    price: 5,
    is_favourite: true,
    thanhvien: 2,
    mentor: 'No',
    thumbnail: require('../assets/images/vatli.png'),
  },
];

const top_searches = [
  {
    id: 0,
    label: 'Đại Cương',
  },
  {
    id: 1,
    label: 'Chuyên Ngành',
  },
  {
    id: 2,
    label: 'UI/UX',
  },
  {
    id: 3,
    label: 'Web',
  },
  {
    id: 4,
    label: 'Mobile',
  },
  {
    id: 5,
    label: 'Tiếng Anh',
  },
];

const course_details = {
  id: 0,
  title: 'Group hỗ trợ các bạn học giải tích 1',
  number_of_students: ' 4',
  duration: '1h30 - Thứ 6',
  location: 'Khu A',
  instructor: {
    name: 'Nhật Quang',
    title: 'Mentor Giải Tích',
  },
  videos: [
    {
      title: '1. Introduction',
      duration: '1:37',
      size: '10 MB',
      progress: '100%',
      is_playing: false,
      is_complete: true,
      is_lock: false,
      is_downloaded: false,
    },
    {
      title: '2. User Interface',
      duration: '1:15:00',
      size: '200 MB',
      progress: '100%',
      is_playing: true,
      is_complete: false,
      is_lock: false,
      is_downloaded: true,
    },
    {
      title: '3. User Experience',
      duration: '1:27:00',
      size: '230 MB',
      progress: '0%',
      is_playing: false,
      is_complete: false,
      is_lock: true,
      is_downloaded: false,
    },
  ],
  students: [
    {
      id: 0,
      name: 'Student 1',
      thumbnail: require('../assets/images/student_1.png'),
    },
    {
      id: 1,
      name: 'Student 2',
      thumbnail: require('../assets/images/student_2.png'),
    },
    {
      id: 2,
      name: 'Student 3',
      thumbnail: require('../assets/images/student_3.png'),
    },
    {
      id: 3,
      name: 'Student 3',
      thumbnail: require('../assets/images/student_3.png'),
    },
  ],
  files: [
    {
      id: 0,
      name: 'Đề Cương GT1',
      author: 'Shared by Nhật Quang',
      upload_date: '13th NOV 2022',
      thumbnail: require('../assets/images/pdf.png'),
    },
    {
      id: 1,
      name: 'Giáo Trình GT2',
      author: 'Shared by Nhật Quang',
      upload_date: '13th NOV 2022',
      thumbnail: require('../assets/images/doc.png'),
    },
    {
      id: 2,
      name: 'Sketch File',
      author: 'Shared by Nhật Quang',
      upload_date: '7th Sep 2022',
      thumbnail: require('../assets/images/sketch.png'),
    },
  ],
  discussions: [
    {
      id: 0,
      profile: require('../assets/images/profile.png'),
      name: 'Nhật Quang',
      no_of_comments: '11 comments',
      no_of_likes: '72 likes',
      posted_on: '5 days ago',
      comment:
        'Anh chị nào có file ôn tập môn giải tích 1 thì cho em xin với, đề thi giữa kỳ hoặc cuối kỳ càng tốt ạ. em cảm ơn!.',
      replies: [
        {
          id: 0,
          profile: require('../assets/images/student_1.png'),
          name: 'Nhật Quang',
          posted_on: '4 days ago',
          comment: 'Anh chị nào có file ôn tập môn giải tích 1 thì cho em xin với, đề thi giữa kỳ hoặc cuối kỳ càng tốt ạ. em cảm ơn!',
        },
        {
          id: 1,
          profile: require('../assets/images/student_1.png'),
          name: 'Nhật Quang',
          posted_on: '4 days ago',
          comment: 'Anh chị nào có file ôn tập môn giải tích 1 thì cho em xin với, đề thi giữa kỳ hoặc cuối kỳ càng tốt ạ. em cảm ơn!',
        },
        {
          id: 2,
          profile: require('../assets/images/student_1.png'),
          name: 'Nhật Quang',
          posted_on: '4 days ago',
          comment: 'Anh chị nào có file ôn tập môn giải tích 1 thì cho em xin với, đề thi giữa kỳ hoặc cuối kỳ càng tốt ạ. em cảm ơn!',
        },
        {
          id: 3,
          profile: require('../assets/images/student_1.png'),
          name: 'Nhật Quang',
          posted_on: '4 days ago',
          comment: 'Anh chị nào có file ôn tập môn giải tích 1 thì cho em xin với, đề thi giữa kỳ hoặc cuối kỳ càng tốt ạ. em cảm ơn!',
        },
      ],
    },
    {
      id: 1,
      profile: require('../assets/images/profile.png'),
      name: 'Nhật Quang',
      no_of_comments: '21 comments',
      no_of_likes: '372 likes',
      posted_on: '14 days ago',
      comment:
        'Anh chị nào có file ôn tập môn giải tích 1 thì cho em xin với, đề thi giữa kỳ hoặc cuối kỳ càng tốt ạ. em cảm ơn!, Môn này khó quá mn ơi :v.',
      replies: [
        {
          id: 0,
          profile: require('../assets/images/student_1.png'),
          name: 'Nhật Quang',
          posted_on: '7 days ago',
          comment: 'Anh chị nào có file ôn tập môn giải tích 1 thì cho em xin với, đề thi giữa kỳ hoặc cuối kỳ càng tốt ạ. em cảm ơn!',
        },
        {
          id: 1,
          profile: require('../assets/images/student_1.png'),
          name: 'Nhật Quang',
          posted_on: '7 days ago',
          comment: 'Anh chị nào có file ôn tập môn giải tích 1 thì cho em xin với, đề thi giữa kỳ hoặc cuối kỳ càng tốt ạ. em cảm ơn!',
        },
        {
          id: 2,
          profile: require('../assets/images/student_1.png'),
          name: 'Nhật Quang',
          posted_on: '7 days ago',
          comment: 'Anh chị nào có file ôn tập môn giải tích 1 thì cho em xin với, đề thi giữa kỳ hoặc cuối kỳ càng tốt ạ. em cảm ơn!',
        },
      ],
    },
  ],
};

const notificationByDays = [
  {
    title: 'Today',
    data: [
      {
        id: 1,
        avatar: require('../assets/images/student_1.png'),
        name: 'Admin',
        created_at: '2h 47m ago',
        message:
          'Asked to join online courses regarding professional web designing.',
      },
      {
        id: 2,
        avatar: require('../assets/images/student_2.png'),
        name: 'Customer Care',
        created_at: '3h 02m ago',
        message: 'Your 50% discount code is: ON50DIS. Apply on checkout.',
      },
      {
        id: 3,
        avatar: require('../assets/images/student_3.png'),
        name: 'Lilian Ellis',
        created_at: '4h 32m ago',
        message: 'Asked assiged you to watch professional videography course.',
      },
    ],
  },
  {
    title: 'Yesterday',
    data: [
      {
        id: 4,
        avatar: require('../assets/images/student_1.png'),
        name: 'Admin',
        created_at: '16h 47m ago',
        message:
          'You just signed in from another device check inbox for more details.',
      },
      {
        id: 5,
        avatar: require('../assets/images/student_2.png'),
        name: 'Customer Care',
        created_at: '20h 02m ago',
        message: 'Your 50% discount code is: ON50DIS. Apply on checkout.',
      },
    ],
  },
];

export default {
  categories,
  courses_list_1,
  courses_list_2,
  top_searches,
  course_details,
  notificationByDays,
};
