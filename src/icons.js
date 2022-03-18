import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faEnvelope,
  faPhone,
  faBriefcase,
  faLocation,
  faPerson,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const Icons = () => {
  return library.add(
    faEnvelope,
    faPhone,
    faBriefcase,
    faLocation,
    faPerson,
    faTrash
  );
};

export default Icons;
