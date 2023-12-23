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
  Chip,
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
  CreatePerijinan,
  DeletePerijinan,
  GetPerijinan,
  UpdateStatus,
} from "../../api/apiPerijinan";
import { MdEditNote } from "react-icons/md";
import { getLaporanIzinKeluar } from "../../api/apiLaporan";

const PerijinanPage = () => {
  const namaKaryawan = sessionStorage.getItem("namaKaryawan");
  const role = sessionStorage.getItem("role");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [currentId, setCurrentId] = useState(null);
  const [dataPerijinan, setDataPerijinan] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState("");
  const [currentPerijinanData, setCurrentPerijinanData] = useState({
    nama_siswa: "",
    kelas: "",
    program_keahlian: "",
    nama_guru_piket: "",
    nama_guru_pelajaran: "",
    keterangan: "",
    jam_keluar: "",
    jam_kembali: "",
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
    setCurrentPerijinanData({
      nama_siswa: "",
      kelas: "",
      program_keahlian: "",
      nama_guru_piket: "",
      nama_guru_pelajaran: "",
      keterangan: "",
      jam_keluar: "",
      jam_kembali: "",
    });
  };

  const {
    isOpen: changeModalOpen,
    onOpen: openChangeModal,
    onOpenChange: onChangeModalOpenChange,
    onClose: closeChangeModal,
  } = useDisclosure();

  const columns = [
    { key: "nama_siswa", label: "Nama Siswa" },
    { key: "kelas", label: "Kelas" },
    { key: "program_keahlian", label: "Program Keahlian" },
    { key: "nama_guru_piket", label: "Guru Piket" },
    { key: "nama_guru_pelajaran", label: "Guru Pelajaran" },
    { key: "keterangan", label: "Keterangan" },
    { key: "jam_keluar", label: "Jam Keluar" },
    { key: "jam_kembali", label: "Jam Kembali" },
    { key: "status", label: "Status" },
    { key: "actions", label: "ACTIONS" },
  ];

  const filteredRows = dataPerijinan.filter((dataPerijinan) =>
    columns.some((column) => {
      return (
        typeof dataPerijinan[column.key] === "string" &&
        dataPerijinan[column.key].toLowerCase().includes(search.toLowerCase())
      );
    })
  );

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedRows = filteredRows.slice(startIndex, endIndex);

  // Get Data Perijinan
  const GetDataPerijinan = () => {
    setIsLoading(true);
    GetPerijinan()
      .then((res) => {
        setDataPerijinan(res);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  // change status
  const handleChangeStatus = (id) => {
    UpdateStatus(id)
      .then((res) => {
        console.log(res);
        GetDataPerijinan();
        closeChangeModal();
        setCurrentId(null);
        toast.success(res.message);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  // Create Perijinan
  const handleCreate = () => {
    console.log(currentPerijinanData);
    CreatePerijinan({
      ...currentPerijinanData,
      nama_guru_piket: namaKaryawan,
    })
      .then((res) => {
        console.log(res);
        GetDataPerijinan();
        closeCreateModal();
        clearModal();
        toast.success("Data berhasil ditambahkan");
      })
      .catch((err) => {
        toast.error(err.message);
        clearModal();
      });
  };

  const cetakLaporan = (date) => {
    getLaporanIzinKeluar(date)
      .then(() => {
        toast.success("berhasil download pdf");
      })
      .catch(() => {
        toast.error("gagal download pdf");
      });
  }

  useEffect(() => {
    GetDataPerijinan();
  }, []);

  return (
    <section>
      <div className="h2 text-primary p-2 rounded-lg font-semibold text-[24px] uppercase flex items-center">
        <MdEditNote className="text-2xl mr-2" />
        Data Perijinan
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
          <div className="flex justify-end flex-col md:flex-row md:items-center w-full">
            <Input
              label="Tanggal Cetak Laporan"
              type="month"
              className="me-2 w-full md:max-w-[30%] mb-2 md:mb-0 text-medium"
              onChange={(e) => setDate(e.target.value)}
            ></Input>
            {date && (
              <button
                className="btn btn-primary rounded-md flex-none px-4 py-2 mt-2 lg:mt-0"
                onClick={() => cetakLaporan(date)}
              >
                <IoMdDownload className="mr-2" />
                  Download PDF
              </button>
            )}
          </div>
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
                        case "jam_keluar":
                          return moment(
                            row.jam_keluar,
                            "YYYY-MM-DD HH:mm:ss"
                          ).format("HH:mm");

                        case "jam_kembali":
                          return moment(
                            row.jam_kembali,
                            "YYYY-MM-DD HH:mm:ss"
                          ).format("HH:mm");

                        case "status":
                          return (
                            <Chip
                              className={
                                row.status === "Kembali"
                                  ? "bg-success-500 text-white"
                                  : "bg-danger-500 text-white"
                              }
                            >
                              {row.status}
                            </Chip>
                          );

                        case "actions":
                          return (
                            <div className="relative flex items-center">
                              {row.status === "Keluar" &&
                                role == "Guru Piket" && (
                                  <Button
                                    size="sm"
                                    color="warning"
                                    className="text-white font-medium"
                                    onClick={() => {
                                      openChangeModal();
                                      setCurrentId(row.id);
                                    }}
                                  >
                                    Sudah Kembali
                                  </Button>
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
            Tambah Data Perijinan
          </ModalHeader>
          <ModalBody>
            <div className="mb-2">
              <Input
                type="text"
                label="Nama Siswa"
                variant="bordered"
                value={currentPerijinanData.nama_siswa}
                onChange={(e) => {
                  setCurrentPerijinanData({
                    ...currentPerijinanData,
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
                value={currentPerijinanData.kelas}
                onChange={(e) => {
                  setCurrentPerijinanData({
                    ...currentPerijinanData,
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
                value={currentPerijinanData.program_keahlian}
                onChange={(e) => {
                  setCurrentPerijinanData({
                    ...currentPerijinanData,
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
                  currentPerijinanData.nama_guru_piket
                    ? currentPerijinanData.nama_guru_piket
                    : namaKaryawan
                }
                onChange={(e) => {
                  setCurrentPerijinanData({
                    ...currentPerijinanData,
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
                value={currentPerijinanData.nama_guru_pelajaran}
                onChange={(e) => {
                  setCurrentPerijinanData({
                    ...currentPerijinanData,
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
                value={currentPerijinanData.keterangan}
                onChange={(e) => {
                  setCurrentPerijinanData({
                    ...currentPerijinanData,
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
                  currentPerijinanData.jam_keluar,
                  "YYYY-MM-DD HH:mm:ss"
                ).format("HH:mm")}
                onChange={(e) => {
                  const combinedDateTime = `${moment().format("YYYY-MM-DD")} ${
                    e.target.value
                  }`;
                  const formattedDateTime = moment(combinedDateTime).format(
                    "YYYY-MM-DD HH:mm:ss"
                  );

                  setCurrentPerijinanData({
                    ...currentPerijinanData,
                    jam_keluar: formattedDateTime,
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
                  currentPerijinanData.jam_kembali,
                  "YYYY-MM-DD HH:mm:ss"
                ).format("HH:mm")}
                onChange={(e) => {
                  const combinedDateTime = `${moment().format("YYYY-MM-DD")} ${
                    e.target.value
                  }`;
                  const formattedDateTime = moment(combinedDateTime).format(
                    "YYYY-MM-DD HH:mm:ss"
                  );

                  setCurrentPerijinanData({
                    ...currentPerijinanData,
                    jam_kembali: formattedDateTime,
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
              <IoMdAdd className="mr-2" />
              Tambah
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal Change Status */}
      <Modal
        isOpen={changeModalOpen}
        onOpenChange={onChangeModalOpenChange}
        placement="center"
      >
        <ModalContent>
          <ModalHeader>Ubah Status</ModalHeader>
          <ModalBody>Apakah siswa sudah kembali?</ModalBody>
          <ModalFooter>
            <button
              className="btn btn-tertiary h-[40px] rounded-md text-black"
              onClick={() => {
                closeChangeModal();
              }}
            >
              Belum
            </button>
            <button
              className="btn btn-primary h-[40px] rounded-md"
              onClick={() => handleChangeStatus(currentId)}
            >
              Sudah
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </section>
  );
};

export default PerijinanPage;
