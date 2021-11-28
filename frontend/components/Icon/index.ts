import Bell from '@svg/bell.svg'
import Home from '@svg/home.svg'
import PlusCircle from '@svg/plus-circle.svg'
import Menu from '@svg/menu.svg'

type Icons = "Bell" | "Home" | 'PlusCircle' | "Menu"

const Icon: { [key in Icons]: React.FC<React.SVGProps<SVGSVGElement>> } = {
    Bell,
    Home,
    PlusCircle,
    Menu
}
export default Icon;