import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { createPet } from "../../../api/petApi";
import { getAllOwners } from "../../../api/ownerApi";

function CreatePetModal({ isOpen, onClose, onPetCreated }) {
  const modalRef = useRef(null);
  const [smartSearch, setSmartSearch] = useState("");
  const [allOwners, setAllOwners] = useState([]);
  const [selectedOwnerId, setSelectedOwnerId] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm();

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal();
      const fetchOwners = async () => {
        try {
          const response = await getAllOwners();
          setAllOwners(response.data.result || []);
          console.log('owner list:', response.data.owners);
        } catch (err) {
          console.log("Failed to Fetch Owner", err);
          toast.error("cannnot Load Owner List");
        }
      };
      fetchOwners();
    } else {
      modalRef.current?.close();
      reset();
      setSmartSearch("");
      setSelectedOwnerId(null);
    }
  }, [isOpen, reset]);

  const filteredOwners = smartSearch
    ? (allOwners || []).filter((owner) =>
        owner.owner_name.toLowerCase().includes(smartSearch.toLowerCase())
      )
    : [];

  const onSubmit = async (data) => {
    if(!selectedOwnerId){
      toast.error("Please Select the Owner From the List")
    }
    const changeToBoolean = {
      ...data,
      sterilization: data.sterilization === "TRUE",
      birth_date: new Date(data.birth_date).toISOString(),
    };
    try {
      await createPet(changeToBoolean);
      toast.success("Pet Created");
      reset();
      onPetCreated();
      onClose();
    } catch (err) {
      console.log("err", err);
      toast.error(err.response?.data?.message || "Failed to Create Pet");
    }
  };


  return (
    <dialog ref={modalRef} className="modal" onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset text-[#DC7C3C] bg-[#1E130B] border border-[#3C2A1F] rounded-box w-xs p-4">
          <legend className="fieldset-legend text-[#DC7C3C]">
            Create New Pet
          </legend>

          <label className="label">Pet Name</label>
          <input
            {...register("pet_name")}
            type="text"
            className="input bg-[#1E130B]"
            placeholder="Pet Name"
          />
          <select {...register("species")} className="select bg-[#1E130B]">
            <option value="CANINE">CANINE</option>
            <option value="FELINE">FELINE</option>
            <option value="EXOTIC">EXOTIC</option>
            <option value="OTHERS">OTHERS</option>
          </select>
          <label className="label">Breed</label>
          <input
            {...register("breed")}
            type="text"
            className="input bg-[#1E130B]"
            placeholder="Breed"
          />
          <label className="label">Gender</label>
          <select {...register("gender")} className="select bg-[#1E130B]">
            <option value="MALE">MALE</option>
            <option value="FEMALE">FEMALE</option>
          </select>
          <label className="label">Sterilization</label>
          <select
            {...register("sterilization")}
            className="select bg-[#1E130B]"
          >
            <option value="TRUE">YES</option>
            <option value="FALSE">NO</option>
          </select>
          <label className="label">Birth Date</label>
          <input
            {...register("birth_date")}
            type="date"
            className="input bg-[#1E130B]"
            placeholder="Birth Date"
          />
          <label className="label">Status</label>
          <select {...register("status")} className="select bg-[#1E130B]">
            <option value="ACTIVE">ACTIVE</option>
            <option value="INACTIVE">INACTIVE</option>
          </select>
          <label className="label">Owner</label>
          <div className="dropdown w-full">
            <input
              type="text"
              className="input bg-[#1E130B]"
              placeholder="Search Owner by Name"
              value={smartSearch}
              onChange={(e) => {
                setSmartSearch(e.target.value);
                setSelectedOwnerId(null);
              }}
            />
            {filteredOwners.length > 0 && !selectedOwnerId && (
              <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full mt-2">
                {filteredOwners.map((owner) => (
                  <li key={owner.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedOwnerId(owner.id);
                        setSmartSearch(owner.owner_name);
                        setValue("ownerId", owner.id)
                      }}
                    >
                      {owner.owner_name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <input
            {...register("ownerId")}
            type="hidden"
            value={selectedOwnerId || ""}
          />

          <div className="modal-action">
            <button type="button" onClick={onClose} className="btn btn-ghost">
              Cancel
            </button>
            <button type="submit" className="btn bg-[#CD7438] text-[#2A1D13]">
              Create
            </button>
          </div>
        </fieldset>
      </form>
    </dialog>
  );
}

export default CreatePetModal;
