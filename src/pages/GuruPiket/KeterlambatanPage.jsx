// @ts-nocheck
import {
  Button,
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
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Spinner,
  useDisclosure,
  Textarea,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { AiOutlineStop } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { FaEdit, FaRunning, FaUserTimes } from "react-icons/fa";
import { IoMdAdd, IoMdDownload } from "react-icons/io";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { toast } from "sonner";
import moment from "moment";
import {
  CreateKeterlambatan,
  DeleteKeterlambatan,
  GetKeterlambatan,
  GetKeterlambatanById,
  UpdateKeterlambatan,
} from "../../api/apiKeterlambatan";

const KeterlambatanPage = () => {
  const namaKaryawan = sessionStorage.getItem("namaKaryawan");
  const role = sessionStorage.getItem("role");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [currentId, setCurrentId] = useState(null);
  const [dataKeterlambatan, setDataKeterlambatan] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentKeterlambatanData, setCurrentKeterlambatanData] = useState({
    nama_siswa: "",
    kelas: "",
    program_keahlian: "",
    nama_guru_piket: "",
    nama_guru_pelajaran: "",
    keterangan: "",
    jam_terlambat: "",
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
    setCurrentKeterlambatanData({
      nama_siswa: "",
      kelas: "",
      program_keahlian: "",
      nama_guru_piket: "",
      nama_guru_pelajaran: "",
      keterangan: "",
      jam_terlambat: "",
    });
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
    { key: "nama_guru_piket", label: "Guru Piket" },
    { key: "nama_guru_pelajaran", label: "Guru Pelajaran" },
    { key: "keterangan", label: "Keterangan" },
    { key: "jam_terlambat", label: "Jam Keterlambatan" },
    { key: "actions", label: "ACTIONS" },
  ];

  const filteredRows = dataKeterlambatan.filter((dataKeterlambatan) =>
    columns.some((column) => {
      return (
        typeof dataKeterlambatan[column.key] === "string" &&
        dataKeterlambatan[column.key]
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    })
  );

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedRows = filteredRows.slice(startIndex, endIndex);

  const handleEdit = (currentId) => {
    setCurrentId(currentId);

    GetKeterlambatanById(currentId)
      .then((res) => {
        console.log(res);
        setCurrentKeterlambatanData({
          nama_siswa: res.nama_siswa,
          kelas: res.kelas,
          program_keahlian: res.program_keahlian,
          nama_guru_piket: res.nama_guru_piket,
          nama_guru_pelajaran: res.nama_guru_pelajaran,
          keterangan: res.keterangan,
          jam_terlambat: res.jam_terlambat,
        });
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(currentId);
    openCreateModal();
  };

  // Get Data Keterlambatan
  const GetDataKeterlambatan = () => {
    setIsLoading(true);
    GetKeterlambatan()
      .then((res) => {
        setDataKeterlambatan(res);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const handleDeleteKeterlambatan = (id) => {
    DeleteKeterlambatan(id)
      .then((res) => {
        console.log(res);
        GetDataKeterlambatan();
        closeDeleteModal();
        setCurrentId(null);
        toast.success(res.message);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  // Create Keterlambatan
  const handleCreate = () => {
    CreateKeterlambatan({
      ...currentKeterlambatanData,
      nama_guru_piket: namaKaryawan,
    })
      .then((res) => {
        console.log(res);
        GetDataKeterlambatan();
        closeCreateModal();
        clearModal();
        toast.success("Data berhasil ditambahkan");
      })
      .catch((err) => {
        toast.error(err.message);
        clearModal();
      });
  };

  // Update Keterlambatan
  const handleUpdate = (id) => {
    UpdateKeterlambatan(id, currentKeterlambatanData)
      .then((res) => {
        console.log(res);
        GetDataKeterlambatan();
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
    GetDataKeterlambatan();
  }, []);

  return (
    <section>
      <div className="h2 text-primary p-2 rounded-lg font-semibold text-[24px] uppercase flex items-center">
        <FaRunning className="text-2xl mr-2" />
        Data Keterlambatan
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
        {role === "Guru Piket" ? (
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
        ) : (
          <button
            className="btn btn-primary rounded-md flex-none px-4 py-2 mt-2 lg:mt-0"
            // onClick={() => {

            // }}
          >
            <IoMdDownload className="mr-2" />
            Download PDF
          </button>
        )}
      </div>

      <div className="mt-8">
        <Table
          aria-label="Tabel Keterlambatan"
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
                        case "jam_terlambat":
                          return moment(
                            row.jam_terlambat,
                            "YYYY-MM-DD HH:mm:ss"
                          ).format("HH:mm");

                        case "actions":
                          return (
                            <div className="relative flex items-center">
                              {role == "Guru Piket" ? (
                                <Dropdown>
                                  <DropdownTrigger>
                                    <Button
                                      isIconOnly
                                      size="sm"
                                      variant="light"
                                    >
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
                                      Ubah
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
                              ) : (
                                ""
                              )}
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
              ? "Ubah Data Keterlambatan"
              : "Tambah Data Keterlambatan"}
          </ModalHeader>
          <ModalBody>
            <div className="mb-2">
              <Input
                type="text"
                label="Nama Siswa"
                variant="bordered"
                value={currentKeterlambatanData.nama_siswa}
                onChange={(e) => {
                  setCurrentKeterlambatanData({
                    ...currentKeterlambatanData,
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
                value={currentKeterlambatanData.kelas}
                onChange={(e) => {
                  setCurrentKeterlambatanData({
                    ...currentKeterlambatanData,
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
                value={currentKeterlambatanData.program_keahlian}
                onChange={(e) => {
                  setCurrentKeterlambatanData({
                    ...currentKeterlambatanData,
                    program_keahlian: e.target.value,
                  });
                }}
              />
            </div>
            <div className="mb-2">
              <Input
                disabled
                type="text"
                label="Guru Piket"
                variant="bordered"
                value={
                  currentKeterlambatanData.nama_guru_piket
                    ? currentKeterlambatanData.nama_guru_piket
                    : namaKaryawan
                }
                onChange={(e) => {
                  setCurrentKeterlambatanData({
                    ...currentKeterlambatanData,
                    nama_guru_piket: e.target.value,
                  });
                }}
              />
            </div>
            <div className="mb-2">
              <Input
                type="text"
                label="Guru Pelajaran"
                variant="bordered"
                value={currentKeterlambatanData.nama_guru_pelajaran}
                onChange={(e) => {
                  setCurrentKeterlambatanData({
                    ...currentKeterlambatanData,
                    nama_guru_pelajaran: e.target.value,
                  });
                }}
              />
            </div>
            <div className="mb-2">
              <Textarea
                type="text"
                label="Keterangan"
                variant="bordered"
                className="w-full"
                value={currentKeterlambatanData.keterangan}
                onChange={(e) => {
                  setCurrentKeterlambatanData({
                    ...currentKeterlambatanData,
                    keterangan: e.target.value,
                  });
                }}
              />
            </div>
            <div className="mb-2">
              <Input
                type="time"
                variant="bordered"
                className="w-full"
                value={moment(
                  currentKeterlambatanData.jam_terlambat,
                  "YYYY-MM-DD HH:mm:ss"
                ).format("HH:mm")}
                onChange={(e) => {
                  const combinedDateTime = `${moment().format("YYYY-MM-DD")} ${
                    e.target.value
                  }`;
                  const formattedDateTime = moment(combinedDateTime).format(
                    "YYYY-MM-DD HH:mm:ss"
                  );

                  setCurrentKeterlambatanData({
                    ...currentKeterlambatanData,
                    jam_terlambat: formattedDateTime,
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

      {/* Modal Delete */}
      <Modal
        isOpen={deleteModalOpen}
        onOpenChange={onDeleteModalOpenChange}
        placement="center"
      >
        <ModalContent>
          <ModalHeader>Hapus Keterlambatan</ModalHeader>
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
              onClick={() => handleDeleteKeterlambatan(currentId)}
            >
              Hapus
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </section>
  );
};

export default KeterlambatanPage;
