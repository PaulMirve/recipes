import Bell from '@svg/bell.svg'
import Home from '@svg/home.svg'
import PlusCircle from '@svg/plus-circle.svg'
import Menu from '@svg/menu.svg'
import Photograph from '@svg/photograph.svg'
import Edit from '@svg/edit.svg'
import Delete from '@svg/delete.svg'
import Plus from '@svg/plus.svg'
import ThumbUpOutline from '@svg/thumb-up-outline.svg'
import ThumbUpFilled from '@svg/thumb-up-filled.svg'
import Calendar from '@svg/calendar.svg'
import BookmarkOutline from '@svg/bookmark-outline.svg'
import BookmarkFilled from '@svg/bookmark-filled.svg'
import Check from '@svg/check.svg'
import PeopleOutline from '@svg/people-outline.svg'
import People from '@svg/people.svg'
import PersonAddOutline from '@svg/person-add-outline.svg'
import Person from '@svg/person.svg'
import Github from '@svg/github.svg'
import Linkedin from '@svg/linkedin.svg'
import AlertCircleOutline from '@svg/alert-circle-outline.svg'
import BookOpen from '@svg/book-open.svg'
import Eye from '@svg/eye.svg'
import InformationCircle from '@svg/information-circle.svg'
import Logout from '@svg/logout.svg'
import Login from '@svg/login.svg'

type Icons = "Bell" | "Home" | 'PlusCircle' | "Menu" | "Photograph" | "Edit" | "Delete" | "Plus" | "ThumbUpOutline" | "ThumbUpFilled" | "Calendar" | "BookmarkOutline" | "BookmarkFilled" | "Check" | "PeopleOutline" | "People" | "PersonAddOutline" | "Person" | "Github" | "Linkedin" | "AlertCircleOutline" | "BookOpen" | "Eye" | "InformationCircle" | "Logout" | "Login";

const Icon: { [key in Icons]: React.FC<React.SVGProps<SVGSVGElement>> } = {
    Bell,
    Home,
    PlusCircle,
    Menu,
    Photograph,
    Delete,
    Edit,
    Plus,
    ThumbUpFilled,
    ThumbUpOutline,
    Calendar,
    BookmarkOutline,
    BookmarkFilled,
    Check,
    People,
    PeopleOutline,
    Person,
    PersonAddOutline,
    Linkedin,
    Github,
    AlertCircleOutline,
    BookOpen,
    Eye,
    InformationCircle,
    Logout,
    Login
}
export default Icon;