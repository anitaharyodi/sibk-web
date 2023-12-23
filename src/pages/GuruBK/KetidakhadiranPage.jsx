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
import { FaEdit, FaUserTimes } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { IoMdDownload } from "react-icons/io";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { toast } from "sonner";
import {
  CreateKetidakhadiran,
  DeleteKetidakhadiran,
  GetKetidakhadiran,
  GetKetidakhadiranById,
  UpdateKetidakhadiran,
} from "../../api/apiKetidakhadiran";
import moment from "moment";
import { getLaporanDataKetidakhadiran } from "../../api/apiLaporan";

const KetidakhadiranPage = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [currentId, setCurrentId] = useState(null);
  const [dataKetidakhadiran, setDataKetidakhadiran] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dateFilter, setDateFilter] = useState("");
  const [currentKetidakhadiranData, setCurrentKetidakhadiranData] = useState({
    nama_siswa: "",
    kelas: "",
    program_keahlian: "",
    keterangan: "",
    tanggal_ketidakhadiran: "",
  });
  const rowsPerPage = 5;

  const onClear = React.useCallback(() => {
    setSearch("");
    setPage(1);
  }, []);

  const formattedDate = moment(
    currentKetidakhadiranData.tanggal_ketidakhadiran
  ).format("YYYY-MM-DD");

  const {
    isOpen: createModalOpen,
    onOpen: openCreateModal,
    onOpenChange: onCreateModalOpenChange,
    onClose: closeCreateModal,
  } = useDisclosure();

  const clearModal = () => {
    setCurrentKetidakhadiranData({
      nama_siswa: "",
      kelas: "",
      program_keahlian: "",
      keterangan: "",
      tanggal_ketidakhadiran: "",
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
    { key: "keterangan", label: "Keterangan" },
    { key: "tanggal_ketidakhadiran", label: "Tanggal Ketidakhadiran" },
    { key: "actions", label: "ACTIONS" },
  ];

  const filteredRows = dataKetidakhadiran.filter((dataKetidakhadiran) =>
    columns.some((column) => {
      return (
        typeof dataKetidakhadiran[column.key] === "string" &&
        dataKetidakhadiran[column.key]
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

    GetKetidakhadiranById(currentId)
      .then((res) => {
        console.log(res);
        setCurrentKetidakhadiranData({
          nama_siswa: res.nama_siswa,
          kelas: res.kelas,
          program_keahlian: res.program_keahlian,
          keterangan: res.keterangan,
          tanggal_ketidakhadiran: res.tanggal_ketidakhadiran,
        });
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(currentId);
    openCreateModal();
  };

  // Get Data Ketidakhadiran
  const GetDataKetidakhadiran = () => {
    setIsLoading(true);
    GetKetidakhadiran()
      .then((res) => {
        setDataKetidakhadiran(res);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const handleDeleteKetidakhadiran = (id) => {
    DeleteKetidakhadiran(id)
      .then((res) => {
        console.log(res);
        GetDataKetidakhadiran();
        closeDeleteModal();
        setCurrentId(null);
        toast.success(res.message);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  // Create Ketidakhadiran
  const handleCreate = () => {
    CreateKetidakhadiran(currentKetidakhadiranData)
      .then((res) => {
        console.log(res);
        GetDataKetidakhadiran();
        closeCreateModal();
        clearModal();
        toast.success("Data berhasil ditambahkan");
      })
      .catch((err) => {
        toast.error(err.message);
        clearModal();
      });
  };

  // Update Ketidakhadiran
  const handleUpdate = (id) => {
    UpdateKetidakhadiran(id, currentKetidakhadiranData)
      .then((res) => {
        console.log(res);
        GetDataKetidakhadiran();
        closeCreateModal();
        clearModal();
        toast.success(res.message);
      })
      .catch((err) => {
        toast.error(err.message);
        clearModal();
      });
  };

  const cetakLaporan = (date) => {
    getLaporanDataKetidakhadiran(date)
      .then(() => {
        toast.success("berhasil download pdf");
      })
      .catch(() => {
        toast.error("gagal download pdf");
      });
  };

  useEffect(() => {
    GetDataKetidakhadiran();
  }, []);

  return (
    <section>
      <div className="h2 text-primary p-2 rounded-lg font-semibold text-[24px] uppercase flex items-center">
        <FaUserTimes className="text-2xl mr-2" />
        Data Ketidakhadiran
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
        <div className="flex justify-end flex-col md:flex-row md:items-center w-full">
          <Input
            label="Tanggal Cetak Laporan"
            type="month"
            className="me-2 w-full md:max-w-[30%] mb-2 md:mb-0 text-medium"
            onChange={(e) => setDateFilter(e.target.value)}
          ></Input>
          {dateFilter && (
            <button
              className="btn btn-primary rounded-md flex-none px-4 py-2 mt-2 me-1 lg:mt-0"
              onClick={() => cetakLaporan(dateFilter)}
            >
              <IoMdDownload className="mr-2" />
              Download PDF
            </button>
          )}
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
      </div>

      <div className="mt-8">
        <Table
          aria-label="Tabel Ketidakhadiran"
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
                        case "tanggal_ketidakhadiran":
                          return moment(row.tanggal_ketidakhadiran).format(
                            "DD MMMM YYYY"
                          );

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
              ? "Ubah Data Ketidakhadiran"
              : "Tambah Data Ketidakhadiran"}
          </ModalHeader>
          <ModalBody>
            <div className="mb-2">
              <Input
                type="text"
                label="Nama Siswa"
                variant="bordered"
                value={currentKetidakhadiranData.nama_siswa}
                onChange={(e) => {
                  setCurrentKetidakhadiranData({
                    ...currentKetidakhadiranData,
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
                value={currentKetidakhadiranData.kelas}
                onChange={(e) => {
                  setCurrentKetidakhadiranData({
                    ...currentKetidakhadiranData,
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
                value={currentKetidakhadiranData.program_keahlian}
                onChange={(e) => {
                  setCurrentKetidakhadiranData({
                    ...currentKetidakhadiranData,
                    program_keahlian: e.target.value,
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
                value={currentKetidakhadiranData.keterangan}
                onChange={(e) => {
                  setCurrentKetidakhadiranData({
                    ...currentKetidakhadiranData,
                    keterangan: e.target.value,
                  });
                }}
              />
            </div>
            <div className="mb-2">
              <Input
                type="date"
                variant="bordered"
                className="w-full"
                value={formattedDate}
                onChange={(e) => {
                  console.log(e.target.value);
                  setCurrentKetidakhadiranData({
                    ...currentKetidakhadiranData,
                    tanggal_ketidakhadiran: e.target.value,
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
          <ModalHeader>Hapus Ketidakhadiran</ModalHeader>
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
              onClick={() => handleDeleteKetidakhadiran(currentId)}
            >
              Hapus
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </section>
  );
};

export default KetidakhadiranPage;
