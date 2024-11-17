// import { useState } from 'react'
// import Head from 'next/head'
// import Link from 'next/link'
// import { BarChart, Users, BookOpen, Settings } from 'lucide-react'

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"

// export default function AdminDashboard() {
//   const [activeTab, setActiveTab] = useState('overview')

//   const sidebarItems = [
//     { name: 'Overview', icon: BarChart, tab: 'overview' },
//     { name: 'Students', icon: Users, tab: 'students' },
//     { name: 'Courses', icon: BookOpen, tab: 'courses' },
//     { name: 'Settings', icon: Settings, tab: 'settings' },
//   ]

//   const mockData = {
//     totalStudents: 1234,
//     totalCourses: 15,
//     totalRevenue: 50000,
//     recentStudents: [
//       { id: 1, name: 'Alice Johnson', email: 'alice@example.com', course: 'Web Development' },
//       { id: 2, name: 'Bob Smith', email: 'bob@example.com', course: 'Data Science' },
//       { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', course: 'UX Design' },
//     ],
//     popularCourses: [
//       { id: 1, name: 'Web Development Bootcamp', students: 500, revenue: 25000 },
//       { id: 2, name: 'Data Science Fundamentals', students: 300, revenue: 15000 },
//       { id: 3, name: 'UX Design Principles', students: 200, revenue: 10000 },
//     ],
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Head>
//         <title>Admin Dashboard | Online Course</title>
//       </Head>
//       <div className="flex h-screen bg-gray-100">
//         {/* Sidebar */}
//         <div className="w-64 bg-white shadow-md">
//           <div className="p-4">
//             <h1 className="text-2xl font-bold text-gray-800">Course Admin</h1>
//           </div>
//           <nav className="mt-4">
//             {sidebarItems.map((item) => (
//               <Link
//                 key={item.tab}
//                 href="#"
//                 className={`flex items-center px-4 py-2 text-gray-700 ${
//                   activeTab === item.tab ? 'bg-gray-200' : 'hover:bg-gray-100'
//                 }`}
//                 onClick={() => setActiveTab(item.tab)}
//               >
//                 <item.icon className="w-5 h-5 mr-2" />
//                 {item.name}
//               </Link>
//             ))}
//           </nav>
//         </div>

//         {/* Main content */}
//         <div className="flex-1 overflow-auto">
//           <header className="bg-white shadow">
//             <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
//               <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
//             </div>
//           </header>
//           <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//             {/* Overview Section */}
//             {activeTab === 'overview' && (
//               <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//                 <Card>
//                   <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                     <CardTitle className="text-sm font-medium">Total Students</CardTitle>
//                     <Users className="h-4 w-4 text-muted-foreground" />
//                   </CardHeader>
//                   <CardContent>
//                     <div className="text-2xl font-bold">{mockData.totalStudents}</div>
//                   </CardContent>
//                 </Card>
//                 <Card>
//                   <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                     <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
//                     <BookOpen className="h-4 w-4 text-muted-foreground" />
//                   </CardHeader>
//                   <CardContent>
//                     <div className="text-2xl font-bold">{mockData.totalCourses}</div>
//                   </CardContent>
//                 </Card>
//                 <Card>
//                   <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                     <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
//                     <BarChart className="h-4 w-4 text-muted-foreground" />
//                   </CardHeader>
//                   <CardContent>
//                     <div className="text-2xl font-bold">${mockData.totalRevenue}</div>
//                   </CardContent>
//                 </Card>
//               </div>
//             )}

//             {/* Students Section */}
//             {activeTab === 'students' && (
//               <div className="bg-white shadow overflow-hidden sm:rounded-lg">
//                 <div className="px-4 py-5 sm:px-6">
//                   <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Students</h3>
//                 </div>
//                 <div className="border-t border-gray-200">
//                   <ul className="divide-y divide-gray-200">
//                     {mockData.recentStudents.map((student) => (
//                       <li key={student.id} className="px-4 py-4 sm:px-6">
//                         <div className="flex items-center justify-between">
//                           <p className="text-sm font-medium text-indigo-600 truncate">{student.name}</p>
//                           <div className="ml-2 flex-shrink-0 flex">
//                             <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
//                               {student.course}
//                             </p>
//                           </div>
//                         </div>
//                         <div className="mt-2 sm:flex sm:justify-between">
//                           <div className="sm:flex">
//                             <p className="flex items-center text-sm text-gray-500">
//                               {student.email}
//                             </p>
//                           </div>
//                         </div>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//             )}

//             {/* Courses Section */}
//             {activeTab === 'courses' && (
//               <div className="bg-white shadow overflow-hidden sm:rounded-lg">
//                 <div className="px-4 py-5 sm:px-6">
//                   <h3 className="text-lg leading-6 font-medium text-gray-900">Popular Courses</h3>
//                 </div>
//                 <div className="border-t border-gray-200">
//                   <ul className="divide-y divide-gray-200">
//                     {mockData.popularCourses.map((course) => (
//                       <li key={course.id} className="px-4 py-4 sm:px-6">
//                         <div className="flex items-center justify-between">
//                           <p className="text-sm font-medium text-indigo-600 truncate">{course.name}</p>
//                           <div className="ml-2 flex-shrink-0 flex">
//                             <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
//                               {course.students} students
//                             </p>
//                           </div>
//                         </div>
//                         <div className="mt-2 sm:flex sm:justify-between">
//                           <div className="sm:flex">
//                             <p className="flex items-center text-sm text-gray-500">
//                               Revenue: ${course.revenue}
//                             </p>
//                           </div>
//                         </div>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//             )}

//             {/* Settings Section */}
//             {activeTab === 'settings' && (
//               <div className="bg-white shadow overflow-hidden sm:rounded-lg">
//                 <div className="px-4 py-5 sm:px-6">
//                   <h3 className="text-lg leading-6 font-medium text-gray-900">Admin Settings</h3>
//                   <p className="mt-1 max-w-2xl text-sm text-gray-500">Manage your admin account and preferences.</p>
//                 </div>
//                 <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
//                   <dl className="sm:divide-y sm:divide-gray-200">
//                     <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//                       <dt className="text-sm font-medium text-gray-500">Full name</dt>
//                       <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">John Doe</dd>
//                     </div>
//                     <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//                       <dt className="text-sm font-medium text-gray-500">Email address</dt>
//                       <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">johndoe@example.com</dd>
//                     </div>
//                     <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//                       <dt className="text-sm font-medium text-gray-500">Role</dt>
//                       <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">Administrator</dd>
//                     </div>
//                   </dl>
//                 </div>
//                 <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
//                   <Button>Save Changes</Button>
//                 </div>
//               </div>
//             )}
//           </main>
//         </div>
//       </div>
//     </div>
//   )
// }

import Link from "next/link"
import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CreditCard,
  DollarSign,
  Menu,
  Package2,
  Search,
  Users,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


export default function Dashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231.89</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Subscriptions
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+2350</div>
              <p className="text-xs text-muted-foreground">
                +180.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12,234</div>
              <p className="text-xs text-muted-foreground">
                +19% from last month
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Now</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+573</div>
              <p className="text-xs text-muted-foreground">
                +201 since last hour
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card
            className="xl:col-span-2" x-chunk="dashboard-01-chunk-4"
          >
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Transactions</CardTitle>
                <CardDescription>
                  Recent transactions from your store.
                </CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="#">
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead className="hidden xl:table-column">
                      Type
                    </TableHead>
                    <TableHead className="hidden xl:table-column">
                      Status
                    </TableHead>
                    <TableHead className="hidden xl:table-column">
                      Date
                    </TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Liam Johnson</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        liam@example.com
                      </div>
                    </TableCell>
                    <TableCell className="hidden xl:table-column">
                      Sale
                    </TableCell>
                    <TableCell className="hidden xl:table-column">
                      <Badge className="text-xs" variant="outline">
                        Approved
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                      2023-06-23
                    </TableCell>
                    <TableCell className="text-right">$250.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Olivia Smith</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        olivia@example.com
                      </div>
                    </TableCell>
                    <TableCell className="hidden xl:table-column">
                      Refund
                    </TableCell>
                    <TableCell className="hidden xl:table-column">
                      <Badge className="text-xs" variant="outline">
                        Declined
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                      2023-06-24
                    </TableCell>
                    <TableCell className="text-right">$150.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Noah Williams</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        noah@example.com
                      </div>
                    </TableCell>
                    <TableCell className="hidden xl:table-column">
                      Subscription
                    </TableCell>
                    <TableCell className="hidden xl:table-column">
                      <Badge className="text-xs" variant="outline">
                        Approved
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                      2023-06-25
                    </TableCell>
                    <TableCell className="text-right">$350.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Emma Brown</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        emma@example.com
                      </div>
                    </TableCell>
                    <TableCell className="hidden xl:table-column">
                      Sale
                    </TableCell>
                    <TableCell className="hidden xl:table-column">
                      <Badge className="text-xs" variant="outline">
                        Approved
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                      2023-06-26
                    </TableCell>
                    <TableCell className="text-right">$450.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Liam Johnson</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        liam@example.com
                      </div>
                    </TableCell>
                    <TableCell className="hidden xl:table-column">
                      Sale
                    </TableCell>
                    <TableCell className="hidden xl:table-column">
                      <Badge className="text-xs" variant="outline">
                        Approved
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                      2023-06-27
                    </TableCell>
                    <TableCell className="text-right">$550.00</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-5">
            <CardHeader>
              <CardTitle>Recent Sales</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
              <div className="flex items-center gap-4">
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarImage src="/avatars/01.png" alt="Avatar" />
                  <AvatarFallback>OM</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    Olivia Martin
                  </p>
                  <p className="text-sm text-muted-foreground">
                    olivia.martin@email.com
                  </p>
                </div>
                <div className="ml-auto font-medium">+$1,999.00</div>
              </div>
              <div className="flex items-center gap-4">
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarImage src="/avatars/02.png" alt="Avatar" />
                  <AvatarFallback>JL</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    Jackson Lee
                  </p>
                  <p className="text-sm text-muted-foreground">
                    jackson.lee@email.com
                  </p>
                </div>
                <div className="ml-auto font-medium">+$39.00</div>
              </div>
              <div className="flex items-center gap-4">
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarImage src="/avatars/03.png" alt="Avatar" />
                  <AvatarFallback>IN</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    Isabella Nguyen
                  </p>
                  <p className="text-sm text-muted-foreground">
                    isabella.nguyen@email.com
                  </p>
                </div>
                <div className="ml-auto font-medium">+$299.00</div>
              </div>
              <div className="flex items-center gap-4">
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarImage src="/avatars/04.png" alt="Avatar" />
                  <AvatarFallback>WK</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    William Kim
                  </p>
                  <p className="text-sm text-muted-foreground">
                    will@email.com
                  </p>
                </div>
                <div className="ml-auto font-medium">+$99.00</div>
              </div>
              <div className="flex items-center gap-4">
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarImage src="/avatars/05.png" alt="Avatar" />
                  <AvatarFallback>SD</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    Sofia Davis
                  </p>
                  <p className="text-sm text-muted-foreground">
                    sofia.davis@email.com
                  </p>
                </div>
                <div className="ml-auto font-medium">+$39.00</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
