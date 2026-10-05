import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {


  schoolOfficials: any[] = [
    {
      id: 1,
      name: 'Dr. Elizabeth Vance',
      role: 'Principal & Head of School',
      bio: 'Over 20 years in educational leadership, driving academic excellence and technological innovation.',
      avatar: 'https://i.pravatar.cc/300?img=47',
    },
    {
      id: 2,
      name: 'Marcus Holloway',
      role: 'Vice Principal (Academic Affairs)',
      bio: 'Specializes in curriculum development, STEM initiatives, and student mentorship programs.',
      avatar: 'https://i.pravatar.cc/300?img=12',
    },
    {
      id: 3,
      name: 'Sophia Reynolds',
      role: 'Dean of Student Affairs',
      bio: 'Dedicated to fostering inclusive school culture, student wellbeing, and extracurricular growth.',
      avatar: 'https://i.pravatar.cc/300?img=32',
    },
  ];

  teachers: any[] = [
    {
      id: 4,
      name: 'David Chen',
      role: 'Senior Mathematics Instructor',
      department: 'Mathematics & Computing',
      bio: 'Passionate about making calculus and problem-solving accessible to all students.',
      avatar: 'https://i.pravatar.cc/300?img=60',
    },
    {
      id: 5,
      name: 'Amanda Brooks',
      role: 'Head of Sciences',
      department: 'Physics & Chemistry',
      bio: 'Encouraging hands-on lab experiments and inquiry-based scientific discovery.',
      avatar: 'https://i.pravatar.cc/300?img=49',
    },
    {
      id: 6,
      name: 'Robert Taylor',
      role: 'English Literature Educator',
      department: 'Humanities & Arts',
      bio: 'Guiding students through classical literature, analytical writing, and creative expression.',
      avatar: 'https://i.pravatar.cc/300?img=15',
    },
    {
      id: 7,
      name: 'Elena Rostova',
      role: 'Computer Science Lead',
      department: 'Information Technology',
      bio: 'Teaching web development, algorithm logic, and modern digital literacy skills.',
      avatar: 'https://i.pravatar.cc/300?img=5',
    },
  ];
}