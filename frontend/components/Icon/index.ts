import Bell from '@svg/bell.svg'
import Home from '@svg/home.svg'
import PlusCircle from '@svg/plus-circle.svg'
import Menu from '@svg/menu.svg'
import Photograph from '@svg/photograph.svg'
import Edit from '@svg/edit.svg'
import Delete from '@svg/delete.svg'
import Plus from '@svg/plus.svg'

type Icons = "Bell" | "Home" | 'PlusCircle' | "Menu" | "Photograph" | "Edit" | "Delete" | "Plus";

const Icon: { [key in Icons]: React.FC<React.SVGProps<SVGSVGElement>> } = {
    Bell,
    Home,
    PlusCircle,
    Menu,
    Photograph,
    Delete,
    Edit,
    Plus
}
export default Icon;