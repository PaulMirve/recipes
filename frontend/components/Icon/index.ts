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

type Icons = "Bell" | "Home" | 'PlusCircle' | "Menu" | "Photograph" | "Edit" | "Delete" | "Plus" | "ThumbUpOutline" | "ThumbUpFilled" | "Calendar" | "BookmarkOutline" | "BookmarkFilled" | "Check";

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
    Check
}
export default Icon;