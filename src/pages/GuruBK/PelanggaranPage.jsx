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
import {
  GetPelanggaran,
  GetListPelanggaran,
  GetSanksi,
  CreatePelanggaran,
  UpdatePelanggaran,
  GetPelanggaranById,
  DeletePelanggaran,
} from "../../api/apiPelanggaran";

const PelanggaranPage = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [currentId, setCurrentId] = useState(null);
  const [dataPelanggaran, setDataPelanggaran] = useState([]);
  const [listPelanggaran, setListPelanggaran] = useState([]);
  const [listSanksi, setListSanksi] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPelanggaranData, setCurrentPelanggaranData] = useState({
    nama_siswa: "",
    kelas: "",
    program_keahlian: "",
    nama_guru_bk: "",
    id_list_pelanggaran: "",
    kategori: "",
    jenis_sanksi: "",
    sanksi: "",
    tanggal_pelanggaran: "",
  });
  const rowsPerPage = 5;

  const onClear = React.useCallback(() => {
    setSearch("");
  }, []);

  const {
    isOpen: createModalOpen,
    onOpen: openCreateModal,
    onOpenChange: onCreateModalOpenChange,
    onClose: closeCreateModal,
  } = useDisclosure();

  const clearModal = () => {
    setCurrentPelanggaranData({
      nama_siswa: "",
      kelas: "",
      program_keahlian: "",
      nama_guru_bk: "",
      id_list_pelanggaran: "",
      kategori: "",
      jenis_sanksi: "",
      sanksi: "",
      tanggal_pelanggaran: "",
    });
    setListSanksi([]);
  };

  const {
    isOpen: deleteModalOpen,
    onOpen: openDeleteModal,
    onOpenChange: onDeleteModalOpenChange,
    onClose: closeDeleteModal,
  } = useDisclosure();

  const columns = [
    { key: "nama_siswa", label: "Nama Siswa" },
    { key: "kelas", label: "Kelas" },
    { key: "program_keahlian", label: "Program Keahlian" },
    { key: "nama_guru_bk", label: "Guru BK" },
    { key: "pelanggaran", label: "Pelanggaran" },
    { key: "kategori", label: "Kategori" },
    { key: "sanksi", label: "Sanksi" },
    { key: "actions", label: "ACTIONS" },
  ];

  const filteredRows = dataPelanggaran.filter((dataPelanggaran) =>
    columns.some(
      (column) =>
        typeof dataPelanggaran[column.key] === "string" &&
        dataPelanggaran[column.key].toLowerCase().includes(search.toLowerCase())
    )
  );

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedRows = filteredRows.slice(startIndex, endIndex);

  const jenisSanksi = [
    { id:1, label: "Bakti_Diri", value: "Bakti Diri" },
    { id:2, label: "Bakti_Wiyata_Mandala", value: "Bakti Wiyata Mandala" },
  ];

  const handleEdit = (currentId) => {
    setCurrentId(currentId);

    GetPelanggaranById(currentId)
      .then((res) => {
        console.log(res);
        setCurrentPelanggaranData({
          nama_siswa: res.nama_siswa,
          kelas: res.kelas,
          program_keahlian: res.program_keahlian,
          nama_guru_bk: res.nama_guru_bk,
          id_list_pelanggaran: new Set([res.id_list_pelanggaran.toString()]),
          kategori: res.list_pelanggaran.kategori.nama_kategori,
          jenis_sanksi: res.jenis_sanksi,
          sanksi: res.sanksi,
          tanggal_pelanggaran: res.tanggal_pelanggaran,
        });
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(currentId);
    openCreateModal();
  };

  const findSanksi = (id) => {
    const findListSanksi = listSanksi.find((sanksi) => sanksi.id == id);
    console.log(listSanksi);
    console.log(findListSanksi);
    console.log(id);
    return findListSanksi.sanksi;
  };

  // Get Data Pelanggaran
  const GetDataPelanggaran = () => {
    setIsLoading(true);
    GetPelanggaran()
      .then((res) => {
        setDataPelanggaran(res);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  // Get List Pelanggaran
  const getListPelanggaran = () => {
    GetListPelanggaran()
      .then((res) => {
        setListPelanggaran(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteSeason = (id) => {
    DeletePelanggaran(id)
      .then((res) => {
        console.log(res);
        GetDataPelanggaran();
        closeDeleteModal();
        setCurrentId(null);
        toast.success(res.message)
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message)
      });
  };
  // Get List Sanksi by Filter
  const getDataSanksi = (jenis_sanksi, kategori) => {
    GetSanksi(jenis_sanksi, kategori)
      .then((res) => {
        setListSanksi(res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // Create Pelanggaran
  const handleCreate = () => {
     console.log(currentPelanggaranData)
      CreatePelanggaran({
        ...currentPelanggaranData,

        sanksi: findSanksi(currentPelanggaranData.sanksi),
      })
        .then((res) => {
          console.log(res);
          GetDataPelanggaran();
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
    UpdatePelanggaran(id, {
      ...currentPelanggaranData,
      sanksi: findSanksi(currentPelanggaranData.sanksi),
    })
      .then((res) => {
        console.log(res);
        GetDataPelanggaran();
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
    GetDataPelanggaran();
    getListPelanggaran();
  }, []);

  return (
    <section>
      <div className="h2 text-primary p-2 rounded-lg font-semibold text-[24px] uppercase flex items-center">
        <AiOutlineStop className="text-2xl mr-2" />
        Data Pelanggaran
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
          >
            {paginatedRows.map((row) => (
              <TableRow key={row.key}>
                {columns.map((column) => (
                  <TableCell className="text-medium" key={column.key}>
                    {(() => {
                      switch (column.key) {
                        case "kategori":
                          return (
                            <Chip
                              className={
                                row.list_pelanggaran.kategori.nama_kategori ===
                                "RINGAN"
                                  ? "bg-success-500 text-white"
                                  : row.list_pelanggaran.kategori
                                      .nama_kategori === "SEDANG"
                                  ? "bg-warning-500 text-white"
                                  : "bg-danger-500 text-white"
                              }
                            >
                              {row.list_pelanggaran.kategori.nama_kategori}
                            </Chip>
                          );
                        case "pelanggaran":
                          return row.list_pelanggaran.pelanggaran;

                        case "actions":
                          return (
                            <div className="relative flex items-center">
                              <Dropdown>
                                <DropdownTrigger>
                                  <Button isIconOnly size="sm" variant="light">
                                    <BsThreeDotsVertical className="text-default-500" />
                                  </Button>
                                </DropdownTrigger>
                                <DropdownMenu>
                                  <DropdownItem
                                    color="warning"
                                    startContent={<FaEdit />}
                                    onClick={() => {
                                      handleEdit(row.id);
                                    }}
                                  >
                                    Edit
                                  </DropdownItem>
                                  <DropdownItem
                                    color="danger"
                                    startContent={<RiDeleteBin6Fill />}
                                    onClick={() => {
                                      openDeleteModal();
                                      setCurrentId(row.id);
                                    }}
                                  >
                                    Hapus
                                  </DropdownItem>
                                </DropdownMenu>
                              </Dropdown>
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
        size={"5xl"}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            {currentId ? "Edit Pelanggaran" : "Tambah Pelanggaran"}
          </ModalHeader>
          <ModalBody>
            <div className="mb-2">
              <Input
                type="text"
                label="Nama Siswa"
                variant="bordered"
                value={currentPelanggaranData.nama_siswa}
                onChange={(e) => {
                  setCurrentPelanggaranData({
                    ...currentPelanggaranData,
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
                value={currentPelanggaranData.kelas}
                onChange={(e) => {
                  setCurrentPelanggaranData({
                    ...currentPelanggaranData,
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
                value={currentPelanggaranData.program_keahlian}
                onChange={(e) => {
                  setCurrentPelanggaranData({
                    ...currentPelanggaranData,
                    program_keahlian: e.target.value,
                  });
                }}
              />
            </div>
            <div className="mb-2">
              <Input
                type="text"
                label="Guru BK"
                variant="bordered"
                value={currentPelanggaranData.nama_guru_bk}
                onChange={(e) => {
                  setCurrentPelanggaranData({
                    ...currentPelanggaranData,
                    nama_guru_bk: e.target.value,
                  });
                }}
              />
            </div>
            <div className="mb-2">
              <Input
                type="date"
                variant="bordered"
                value={currentPelanggaranData.tanggal_pelanggaran}
                onChange={(e) => {
                  setCurrentPelanggaranData({
                    ...currentPelanggaranData,
                    tanggal_pelanggaran: e.target.value,
                  });
                }}
              />
            </div>
            {/* Dropdown List Pelanggaran */}
            <div className="mb-2">
              <Select
                items={listPelanggaran}
                placeholder="Pilih Pelanggaran"
                selectedKeys={currentPelanggaranData.id_list_pelanggaran}
                className={{ listboxWrapper: "max-h-[400px]" }}
                variant="bordered"
                label="list Pelanggaran "
                onSelectionChange={(e) => {
                  const selectedPelanggaran = listPelanggaran.find(
                    (js) => js.id === parseInt(e.currentKey)
                  );
                  setCurrentPelanggaranData({
                    ...currentPelanggaranData,

                    id_list_pelanggaran: e.currentKey,
                    kategori: selectedPelanggaran.kategori.nama_kategori,
                  });
                }}
              >
                {listPelanggaran.map((js) => (
                  <SelectItem key={js.id}>{js.pelanggaran}</SelectItem>
                ))}
              </Select>

              {/* <select
                value={currentPelanggaranData.id_list_pelanggaran}
                className="border-2 border-gray-200 py-4 px-2 rounded-lg w-full cursor-pointer text-sm"
                onChange={(e) => {
                  const selectedPelanggaran = listPelanggaran.find(
                    (js) => js.id === parseInt(e.target.value)
                  );

                  setCurrentPelanggaranData({
                    ...currentPelanggaranData,
                    id_list_pelanggaran: e.target.value,
                    kategori: selectedPelanggaran.kategori.nama_kategori,
                  });
                }}
              >
                <option hidden className="text-gray-200">
                  Pilih Pelanggaran
                </option>
                {listPelanggaran.map((js) => (
                  <option value={js.id} key={js.id}>
                    {js.pelanggaran}
                  </option>
                ))}
              </select> */}
            </div>
            {/* Kategori */}
            <div className="mb-2">
              <Input
                disabled
                type="text"
                label="Kategori"
                variant="bordered"
                value={currentPelanggaranData.kategori}
                onChange={(e) => {
                  setCurrentPelanggaranData({
                    ...currentPelanggaranData,
                    kategori: e.target.value,
                  });

                  getDataSanksi(
                    currentPelanggaranData.jenis_sanksi,
                    e.currentKey
                  );
                }}
              />
            </div>
            {/* Jenis Sanksi */}
            <div className="mb-2">
              <Select
                items={jenisSanksi}
                label="Jenis Sanksi"
                placeholder="Pilih Jenis Sanksi"
                selectedKeys={currentPelanggaranData.jenis_sanksi}
                variant="bordered"
                isDisabled={currentPelanggaranData.id_list_pelanggaran === ""}
                onSelectionChange={(e) => {
                  setCurrentPelanggaranData({
                    ...currentPelanggaranData,
                    jenis_sanksi: e.currentKey,
                  });

                  getDataSanksi(e.currentKey, currentPelanggaranData.kategori);
                }}
              >
                {jenisSanksi.map((js) => (
                  <SelectItem key={js.id}>{js.value}</SelectItem>
                ))}
              </Select>
              {/* <select
                value={currentPelanggaranData.jenis_sanksi}
                className="border-2 border-gray-200 py-4 px-2 rounded-lg w-full cursor-pointer text-sm"
                onChange={(e) => {
                  setCurrentPelanggaranData({
                    ...currentPelanggaranData,
                    jenis_sanksi: e.target.value,
                  });

                  getDataSanksi(
                    e.target.value,
                    currentPelanggaranData.kategori
                  );
                }}
              >
                <option hidden className="text-gray-200">
                  Pilih Jenis Sanksi
                </option>
                {jenisSanksi.map((js) => (
                  <option value={js.label} key={js.label}>
                    {js.value}
                  </option>
                ))}
              </select> */}
            </div>
            {/* Sanksi */}

            <div className="mb-2">
              <Select
                items={listSanksi}
                label="List Sanksi"
                placeholder="Pilih List Sanksi"
                selectedKeys={currentPelanggaranData.sanksi}
                variant="bordered"
                isDisabled={
                  currentPelanggaranData.id_list_pelanggaran === "" ||
                  currentPelanggaranData.jenis_sanksi === ""
                }
                onSelectionChange={(e) => {
                  setCurrentPelanggaranData({
                    ...currentPelanggaranData,
                    sanksi: e.currentKey,
                  });
                }}
              >
                {listSanksi.map((js) => (
                  <SelectItem key={js.id}>{js.sanksi}</SelectItem>
                ))}
              </Select>
              {/* <select
                value={currentPelanggaranData.jenis}
                className="border-2 border-gray-200 py-4 px-2 rounded-lg w-full cursor-pointer text-sm"
                onChange={(e) => {
                  setCurrentPelanggaranData({
                    ...currentPelanggaranData,
                    sanksi: e.target.value,
                  });
                }}
              >
                <option hidden className="text-gray-200">
                  Pilih Sanksi
                </option>

                {listSanksi.map((js) => (
                  <option value={js.sanksi} key={js.id}>
                    {js.sanksi}
                  </option>
                ))}
              </select> */}
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

      {/* Modal Delete */}
      <Modal isOpen={deleteModalOpen} onOpenChange={onDeleteModalOpenChange}>
        <ModalContent>
          <ModalHeader>Hapus Pelanggaran</ModalHeader>
          <ModalBody>Apakah Anda yakin ingin menghapus data ini?</ModalBody>
          <ModalFooter>
            <button
              className="btn btn-tertiary h-[40px] rounded-md text-black"
              onClick={() => {
                closeDeleteModal();
              }}
            >
              Batal
            </button>
            <button
              className="btn btn-primary h-[40px] rounded-md"
              onClick={() => handleDeleteSeason(currentId)}
            >
              Hapus
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </section>
  );
};

export default PelanggaranPage;
