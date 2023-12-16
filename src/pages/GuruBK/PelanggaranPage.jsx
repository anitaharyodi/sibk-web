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
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Textarea,
  getKeyValue,
  useDisclosure,
} from "@nextui-org/react";
import React, { useState } from "react";
import { AiOutlineStop } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { RiDeleteBin6Fill } from "react-icons/ri";
import DatePicker from "react-datepicker";

const PelanggaranPage = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [currentId, setCurrentId] = useState(null);
  const [currentPelanggaranData, setCurrentPelanggaranData] = useState({
    namaSiswa: "",
    kelas: "",
    programKeahlian: "",
    guruBK: "",
    pelanggaran: "",
    kategori: "",
    sanksi: "",
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

  const {
    isOpen: deleteModalOpen,
    onOpen: openDeleteModal,
    onOpenChange: onDeleteModalOpenChange,
    onClose: closeDeleteModal,
  } = useDisclosure();

  const columns = [
    { key: "namaSiswa", label: "Nama Siswa" },
    { key: "kelas", label: "Kelas" },
    { key: "programKeahlian", label: "Program Keahlian" },
    { key: "guruBK", label: "Guru BK" },
    { key: "pelanggaran", label: "Pelanggaran" },
    { key: "kategori", label: "Kategori" },
    { key: "sanksi", label: "Sanksi" },
    { key: "actions", label: "ACTIONS" },
  ];

  const rows = [
    {
      key: 1,
      namaSiswa: "John Doe",
      kelas: "12A",
      programKeahlian: "Teknik Informatika",
      guruBK: "Mr. Smith",
      pelanggaran: "Menyontek",
      kategori: "Ringan",
      sanksi: "Teguran",
    },
    {
      key: 2,
      namaSiswa: "Jane Doe",
      kelas: "11B",
      programKeahlian: "Teknik Mesin",
      guruBK: "Ms. Johnson",
      pelanggaran: "Terlambat",
      kategori: "Sedang",
      sanksi: "Pelayanan Masyarakat",
    },
  ];

  const filteredRows = rows.filter((row) =>
    columns.some(
      (column) =>
        typeof row[column.key] === "string" &&
        row[column.key].toLowerCase().includes(search.toLowerCase())
    )
  );

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedRows = filteredRows.slice(startIndex, endIndex);

  const jenisSanksi = [
    { label: "diri", value: "Bakti Diri" },
    { label: "wiyata", value: "Bakti Wiyata Mandala" },
  ];

  const sanksi = [
    { label: "sanksi1", value: "Membersihkan Taman" },
    { label: "sanksi2", value: "Membersihkan Toilet" },
    { label: "sanksi3", value: "Menyiram Tanaman" },
    { label: "sanksi4", value: "Push up 10x" },
  ];

  const handleEdit = (currentId) => {
    setCurrentId(currentId);
    setCurrentPelanggaranData({
      namaSiswa: rows[currentId].namaSiswa,
      kelas: rows[currentId].kelas,
      programKeahlian: rows[currentId].programKeahlian,
      guruBK: rows[currentId].guruBK,
      pelanggaran: rows[currentId].pelanggaran,
      kategori: rows[currentId].kategori,
      sanksi: rows[currentId].sanksi,
    });
    console.log(currentId);
    openCreateModal();
  };

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
          <TableBody items={paginatedRows}>
            {paginatedRows.map((row) => (
              <TableRow key={row.key}>
                {columns.map((column) => (
                  <TableCell className="text-medium" key={column.key}>
                    {column.key === "kategori" ? (
                      <Chip
                        className={
                          row[column.key] === "Ringan"
                            ? "bg-success-500 text-white"
                            : row[column.key] === "Sedang"
                            ? "bg-warning-500 text-white"
                            : "bg-danger-500 text-white"
                        }
                      >
                        {row[column.key]}
                      </Chip>
                    ) : column.key === "actions" ? (
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
                                handleEdit(row.key - 1);
                              }}
                            >
                              Edit
                            </DropdownItem>
                            <DropdownItem
                              color="danger"
                              startContent={<RiDeleteBin6Fill />}
                              onClick={() => {
                                openDeleteModal();
                              }}
                            >
                              Hapus
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </div>
                    ) : (
                      row[column.key]
                    )}
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
        size={"xl"}
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
                value={currentPelanggaranData.namaSiswa}
                onChange={(e) => {
                  setCurrentPelanggaranData({
                    ...currentPelanggaranData,
                    namaSiswa: e.target.value,
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
                value={currentPelanggaranData.programKeahlian}
                onChange={(e) => {
                  setCurrentPelanggaranData({
                    ...currentPelanggaranData,
                    programKeahlian: e.target.value,
                  });
                }}
              />
            </div>
            <div className="mb-2">
              <Input
                type="text"
                label="Guru BK"
                variant="bordered"
                value={currentPelanggaranData.guruBK}
                onChange={(e) => {
                  setCurrentPelanggaranData({
                    ...currentPelanggaranData,
                    guruBK: e.target.value,
                  });
                }}
              />
            </div>
            <div className="mb-2">
              <Textarea
                type="text"
                label="Pelanggaran"
                variant="bordered"
                value={currentPelanggaranData.pelanggaran}
                onChange={(e) => {
                  setCurrentPelanggaranData({
                    ...currentPelanggaranData,
                    pelanggaran: e.target.value,
                  });
                }}
              />
            </div>
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
                }}
              />
            </div>
            <div className="mb-2">
              <select
                value={currentPelanggaranData.kategori}
                className="border-2 border-gray-200 py-4 px-2 rounded-lg w-full cursor-pointer text-sm"
                onChange={(e) => {
                  setCurrentPelanggaranData({
                    ...currentPelanggaranData,
                    kategori: e.target.value,
                  });
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
              </select>
            </div>
            <div className="mb-2">
              <select
                value={currentPelanggaranData.sanksi}
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
                {sanksi.map((js) => (
                  <option value={js.label} key={js.label}>
                    {js.value}
                  </option>
                ))}
              </select>
            </div>
          </ModalBody>

          <ModalFooter>
            <button
              className="btn btn-tertiary h-[40px] rounded-md text-black"
              onClick={() => {
                setCurrentId(null);
                closeCreateModal();
                setCurrentPelanggaranData({
                  namaSiswa: "",
                  kelas: "",
                  programKeahlian: "",
                  guruBK: "",
                  pelanggaran: "",
                  kategori: "",
                  sanksi: "",
                });
              }}
            >
              Batal
            </button>
            <button
              className="btn btn-primary h-[40px] rounded-md"
              //   onClick={() => {
              //     if (currentId) {
              //       openEditModal();
              //     } else {
              //       openCreateModal();
              //     }
              //   }}
            >
              {!currentId ? <IoMdAdd className="mr-2" /> : null}
              {currentId ? "Ubah" : "Tambah"}
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>

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
              //   onClick={() => handleDeleteSeason(seasonToDelete.id)}
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
