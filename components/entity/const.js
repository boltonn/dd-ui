import { 
    HiBugAnt,
    HiOutlineBuildingOffice2,
    HiMiniCpuChip,
    HiMiniCreditCard,
    HiMiniEnvelope,
    HiMiniPhone,
    HiMiniMapPin,
    HiMiniWifi,
    HiMiniIdentification,
    HiMiniUser,
    HiMiniGlobeAlt,
} from "react-icons/hi2";
import { FaPassport } from "react-icons/fa6";


const colors = [
    "bg-violet-500",
    "bg-pink-300",
    "bg-cyan-300",
    "bg-yellow-300",
    "bg-green-300",
    "bg-orange-300",
]

const entityLookup = {
    bin_card: {
        label: 'CREDIT CARD',
        color: colors[0],
        icon: HiMiniCreditCard
    },
    cve: {
        label: 'CVE',
        color: colors[3],
        icon: HiBugAnt
    },
    email: {
        label: 'EMAIL',
        color: colors[1],
        icon: HiMiniEnvelope
    },
    imei: {
        label: 'IMEI',
        color: colors[6],
        icon: HiMiniCpuChip
    },
    imsi: {
        label: 'IMSI',
        color: colors[2],
        icon: HiMiniPhone
    },
    ipv6: {
        label: 'IP ADDRESS',
        color: colors[2],
        icon: HiMiniWifi
    },
    ipv4: {
        label: 'IP ADDRESS',
        color: colors[2],
        icon: HiMiniWifi
    },
    location: {
        label: 'LOCATION',
        color: colors[2],
        icon: HiMiniMapPin
    },
    msisdn: {
        label: 'PHONE NUMBER',
        color: colors[5],
        icon: HiMiniPhone
    },
    organization: {
        label: 'ORGANIZATION',
        color: colors[3],
        icon: HiOutlineBuildingOffice2
    },
    passport: {
        label: 'PASSPORT',
        color: colors[4],
        icon: FaPassport
    },
    person: {
        label: 'PERSON',
        color: colors[0],
        icon: HiMiniUser
    },
    url: {
        label: 'URL',
        color: colors[4],
        icon: HiMiniGlobeAlt
    },
}

export default entityLookup;