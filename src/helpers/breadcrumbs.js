export function routesFactory() {
  return function () {
    return [
      //! Home
      {
        id: 0,
        parentId: null,
        path: '/',
        name: 'home',
        text: `Home`,
      },
      //! Sign
      {
        id: 10,
        parentId: 0,
        path: '/sign-in',
        name: 'sign-in',
        text: `Sign in`,
      },
      {
        id: 11,
        parentId: 0,
        path: '/sign-up',
        name: 'sign-up',
        text: `Sign up`,
      },
      //! All courses
      {
        id: 20,
        parentId: 0,
        path: '/courses',
        name: 'courses',
        text: `All courses`,
      },
      {
        id: 21,
        parentId: 20,
        path: '/courses-online',
        name: 'courses-online',
        text: `Online courses`,
      },
      {
        id: 22,
        parentId: 21,
        path: `/courses-online/${this.courseId}`,
        name: 'course-online',
        text: `${this.courseName}`,
      },
      {
        id: 23,
        parentId: 22,
        path: `/courses-online/${this.courseId}/by-course`,
        name: 'by-course',
        text: `By course`,
      },
      {
        id: 24,
        parentId: 22,
        path: `/courses-online/${this.courseId}/by-course-creator`,
        name: 'by-course-creator',
        text: `by course creator`,
      },
      //! Offline courses
      {
        id: 30,
        parentId: 20,
        path: '/courses-offline',
        name: 'courses-offline',
        text: `Offline courses`,
      },
      {
        id: 31,
        parentId: 30,
        path: `/courses-offline/${this.courseId}`,
        name: 'course-offline',
        text: `${this.offlineCourseName}`,
      },
      {
        id: 32,
        parentId: 31,
        path: `/courses-offline/${this.courseId}/by-offline`,
        name: 'by-offline',
        text: `By offline course`,
      },
      //! user-cabinet
      {
        id: 40,
        parentId: 0,
        path: '/user-cabinet',
        name: 'user-cabinet',
        text: `${this.userName} cabinet`,
      },
      {
        id: 41,
        parentId: 40,
        path: '/user-cabinet/courses',
        name: 'user-courses',
        text: `${this.userName} courses`,
      },
      {
        id: 42,
        parentId: 41,
        path: '/user-cabinet/add-course',
        name: 'add-course',
        text: `Add courses`,
      },
      {
        id: 43,
        parentId: 41,
        path: `/user-cabinet/courses/${this.courseId}`,
        name: 'user-course',
        text: `${this.courseName}`,
      },
      {
        id: 44,
        parentId: 43,
        path: `/user-cabinet/courses/${this.courseId}/add-videos`,
        name: 'add-course-videos',
        text: `Add videos`,
      },
      {
        id: 45,
        parentId: 43,
        path: `/user-cabinet/courses/${this.courseId}/videos`,
        name: 'user-videos',
        text: `Videos`,
      },
      {
        id: 46,
        parentId: 45,
        path: `/user-cabinet/courses/${this.courseId}/videos/${this.lessonId}`,
        name: 'user-video',
        text: `${this.lessonName}`,
      },
      // ! purchased-online-courses
      {
        id: 47,
        parentId: 40,
        path: `/user-cabinet/purchased-online-courses`,
        name: 'purchased-online-courses',
        text: `Purchased online courses`,
      },
      {
        id: 48,
        parentId: 47,
        path: `/user-cabinet/purchased-online-courses/${this.courseId}`,
        name: 'purchased-online-course',
        text: `${this.purchasedCourseName}`,
      },
      {
        id: 49,
        parentId: 48,
        path: `/user-cabinet/purchased-online-courses/${this.courseId}/lessons`,
        name: 'purchased-lessons',
        text: `Lessons`,
      },
      {
        id: 50,
        parentId: 49,
        path: `/user-cabinet/purchased-online-courses/${this.courseId}/lessons/${this.lessonId}`,
        name: 'purchased-lesson',
        text: `${this.purchasedLessonName}`,
      },
      // ! purchased-offline-courses
      {
        id: 60,
        parentId: 40,
        path: `/user-cabinet/purchased-offline-courses`,
        name: 'purchased-offline-courses',
        text: `Purchased offline courses`,
      },
      {
        id: 61,
        parentId: 60,
        path: `/user-cabinet/purchased-offline-courses/${this.courseId}`,
        name: 'purchased-offline-course',
        text: `${this.purchasedCourseName}`,
      },
      // ! purchased-commodities
      {
        id: 70,
        parentId: 40,
        path: `/user-cabinet/purchased-commodities`,
        name: 'purchased-commodities',
        text: `Purchased commodities`,
      },
    ];
  };
}
