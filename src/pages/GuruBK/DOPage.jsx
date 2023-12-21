// @ts-nocheck
import {
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Pagination,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Spinner,
  Textarea,
  getKeyValue,
  useDisclosure,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { AiOutlineStop } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { RiDeleteBin6Fill } from "react-icons/ri";
import DatePicker from "react-datepicker";
import { toast } from "sonner";
import { CreateDO, GetDO, GetDOById, UpdateDO } from "../../api/apiDO";
import { MdMoveDown } from "react-icons/md";

const DOPage = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [currentId, setCurrentId] = useState(null);
  const [dataDO, setDataDO] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentDOData, setCurrentDOData] = useState({
    nama_siswa: "",
    kelas: "",
    program_keahlian: "",
    alasan: "",
  });
  const rowsPerPage = 5;

  const onClear = React.useCallback(() => {
    setSearch("");
    setPage(1);
  }, []);

  const {
    isOpen: createModalOpen,
    onOpen: openCreateModal,
    onOpenChange: onCreateModalOpenChange,
    onClose: closeCreateModal,
  } = useDisclosure();

  const clearModal = () => {
    setCurrentDOData({
      nama_siswa: "",
      kelas: "",
      program_keahlian: "",
      alasan: "",
    });
  };

  const columns = [
    { key: "nama_siswa", label: "Nama Siswa" },
    { key: "kelas", label: "Kelas" },
    { key: "program_keahlian", label: "Program Keahlian" },
    { key: "alasan", label: "Alasan" },
    { key: "actions", label: "ACTIONS" },
  ];

  const filteredRows = dataDO.filter((dataDO) =>
    columns.some((column) => {
      return (
        typeof dataDO[column.key] === "string" &&
        dataDO[column.key].toLowerCase().includes(search.toLowerCase())
      );
    })
  );

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedRows = filteredRows.slice(startIndex, endIndex);

  const handleEdit = (currentId) => {
    setCurrentId(currentId);

    GetDOById(currentId)
      .then((res) => {
        console.log(res);
        setCurrentDOData({
          nama_siswa: res.nama_siswa,
          kelas: res.kelas,
          program_keahlian: res.program_keahlian,
          alasan: res.alasan,
        });
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(currentId);
    openCreateModal();
  };

  // Get Data DO
  const GetDataDO = () => {
    setIsLoading(true);
    GetDO()
      .then((res) => {
        setDataDO(res);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  // Create Pelanggaran
  const handleCreate = () => {
    CreateDO({
      ...currentDOData,
    })
      .then((res) => {
        console.log(res);
        GetDataDO();
        closeCreateModal();
        clearModal();
        toast.success("Data berhasil ditambahkan");
      })
      .catch((err) => {
        toast.error(err.message);
        clearModal();
      });
  };

  // Update Pelanggaran
  const handleUpdate = (id) => {
    UpdateDO(id, {
      ...currentDOData,
    })
      .then((res) => {
        console.log(res);
        GetDataDO();
        closeCreateModal();
        clearModal();
        toast.success(res.message);
      })
      .catch((err) => {
        toast.error(err.message);
        clearModal();
      });
  };

  useEffect(() => {
    GetDataDO();
  }, []);

  return (
    <section>
      <div className="h2 text-primary p-2 rounded-lg font-semibold text-[24px] uppercase flex items-center">
        <MdMoveDown className="text-2xl mr-2" />
        Data Keluar/Pindah
      </div>

      <div className="mb-4 flex flex-col md:flex-row md:items-center justify-between">
        <Input
          isClearable
          className="w-full md:max-w-[30%] mb-2 md:mb-0 text-medium"
          placeholder="Search"
          onClear={() => onClear()}
          startContent={<CiSearch />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="btn btn-primary rounded-md flex-none px-4 py-2 mt-2 lg:mt-0"
          onClick={() => {
            clearModal();
            openCreateModal();
          }}
        >
          <IoMdAdd className="mr-2" />
          Tambah
        </button>
      </div>

      <div className="mt-8">
        <Table
          aria-label="Tabel Pelanggaran"
          bottomContent={
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={
                  filteredRows.length <= rowsPerPage
                    ? 1
                    : Math.ceil(filteredRows.length / rowsPerPage)
                }
                onChange={(page) => setPage(page)}
              />
            </div>
          }
          classNames={{
            wrapper: "min-h-[222px]",
          }}
        >
          <TableHeader>
            {columns.map((column) => (
              <TableColumn key={column.key} className="text-sm">
                {column.label}
              </TableColumn>
            ))}
          </TableHeader>
          <TableBody
            items={paginatedRows}
            isLoading={isLoading}
            loadingContent={<Spinner label="Loading..." />}
            emptyContent={"Tidak ada data yang ditampilkan"}
          >
            {paginatedRows.map((row) => (
              <TableRow key={row.key}>
                {columns.map((column) => (
                  <TableCell className="text-medium" key={column.key}>
                    {(() => {
                      switch (column.key) {
                        case "actions":
                          return (
                            <div className="relative flex items-center">
                              <Button
                                isIconOnly
                                size="md"
                                variant="light"
                                color="warning"
                                onClick={() => {
                                  handleEdit(row.id);
                                }}
                              >
                                <FaEdit className="text-warning-500" />
                              </Button>
                            </div>
                          );

                        default:
                          return column.key.includes(".")
                            ? column.key
                                .split(".")
                                .reduce((obj, key) => obj[key], row)
                            : row[column.key];
                      }
                    })()}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Modal Tambah */}
      <Modal
        isOpen={createModalOpen}
        onOpenChange={onCreateModalOpenChange}
        scrollBehavior={"inside"}
        className="max-w-3xl h-[450px] mx-4 lg:mx-0 lg:h-fit"
        placement="center"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            {currentId
              ? "Ubah Data Keluar/Pindah"
              : "Tambah Data Keluar/Pindah"}
          </ModalHeader>
          <ModalBody>
            <div className="mb-2">
              <Input
                type="text"
                label="Nama Siswa"
                variant="bordered"
                value={currentDOData.nama_siswa}
                onChange={(e) => {
                  setCurrentDOData({
                    ...currentDOData,
                    nama_siswa: e.target.value,
                  });
                }}
              />
            </div>
            <div className="mb-2">
              <Input
                type="text"
                label="Kelas"
                variant="bordered"
                value={currentDOData.kelas}
                onChange={(e) => {
                  setCurrentDOData({
                    ...currentDOData,
                    kelas: e.target.value,
                  });
                }}
              />
            </div>
            <div className="mb-2">
              <Input
                type="text"
                label="Program Keahlian"
                variant="bordered"
                value={currentDOData.program_keahlian}
                onChange={(e) => {
                  setCurrentDOData({
                    ...currentDOData,
                    program_keahlian: e.target.value,
                  });
                }}
              />
            </div>
            <div className="mb-2">
              <Textarea
                type="text"
                label="Alasan"
                variant="bordered"
                value={currentDOData.alasan}
                onChange={(e) => {
                  setCurrentDOData({
                    ...currentDOData,
                    alasan: e.target.value,
                  });
                }}
              />
            </div>
          </ModalBody>

          <ModalFooter>
            <button
              className="btn btn-tertiary h-[40px] rounded-md text-black"
              onClick={() => {
                setCurrentId(null);
                closeCreateModal();
                clearModal();
              }}
            >
              Batal
            </button>
            <button
              className="btn btn-primary h-[40px] rounded-md"
              onClick={() => {
                if (currentId) {
                  handleUpdate(currentId);
                } else {
                  handleCreate();
                }
              }}
            >
              {!currentId ? <IoMdAdd className="mr-2" /> : null}
              {currentId ? "Ubah" : "Tambah"}
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </section>
  );
};

export default DOPage;
