import { useEffect, useState } from "react";
import {
  getTrashBins,
  uploadTrashBinCsv,
  uploadTrashBinImage,
} from "@/services/TrashBinService.js";

const DEFAULT_PAGE_SIZE = 10;

export default function TrashBinAdminPage() {
  const [csvFile, setCsvFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [csvResult, setCsvResult] = useState(null);
  const [imageResult, setImageResult] = useState(null);
  const [trashBins, setTrashBins] = useState([]);
  const [pageInfo, setPageInfo] = useState(null);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [csvUploading, setCsvUploading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  const loadTrashBins = async (nextPage = page) => {
    setLoading(true);

    try {
      const data = await getTrashBins({ page: nextPage, size: DEFAULT_PAGE_SIZE });
      setTrashBins(data?.trashBins ?? []);
      setPageInfo(data?.page ?? null);
    } catch (error) {
      console.error("쓰레기통 목록 조회 실패", error);
      alert("쓰레기통 목록 조회에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTrashBins(page);
  }, [page]);

  const handleCsvUpload = async () => {
    if (!csvFile) {
      alert("CSV 파일을 선택해 주세요.");
      return;
    }

    setCsvUploading(true);

    try {
      const data = await uploadTrashBinCsv(csvFile);
      setCsvResult(data);
      setCsvFile(null);
      await loadTrashBins(0);
      setPage(0);
    } catch (error) {
      console.error("쓰레기통 CSV 업로드 실패", error);
      alert("CSV 업로드에 실패했습니다.");
    } finally {
      setCsvUploading(false);
    }
  };

  const handleImageUpload = async () => {
    if (!imageFile) {
      alert("이미지 파일을 선택해 주세요.");
      return;
    }

    setImageUploading(true);

    try {
      const data = await uploadTrashBinImage(imageFile);
      setImageResult(data);
      setImageFile(null);
      await loadTrashBins(page);
    } catch (error) {
      console.error("쓰레기통 이미지 업로드 실패", error);
      alert("이미지 업로드에 실패했습니다.");
    } finally {
      setImageUploading(false);
    }
  };

  return (
    <section className="d-flex flex-column gap-4">
      <div className="page-card p-4">
        <div className="text-uppercase small fw-bold text-primary mb-2">TrashBin Admin</div>
        <h2 className="page-section-title mb-1">쓰레기통 업로드 관리</h2>
        <p className="page-section-subtitle mb-0">
          Spring Boot `TrashBinController` 계약에 맞춰 CSV 업로드, 이미지 업로드, 저장 목록 조회를 수행합니다.
        </p>
      </div>

      <div className="row g-4">
        <div className="col-12 col-xl-6">
          <div className="page-card h-100 p-4">
            <div className="d-flex justify-content-between align-items-start gap-3 mb-4">
              <div>
                <div className="text-uppercase small fw-bold text-primary mb-2">CSV Upload</div>
                <h3 className="h5 fw-bold mb-1">CSV 데이터 업로드</h3>
                <p className="text-secondary mb-0">`POST /trash-bins/upload`에 `file` 파트로 CSV 파일을 업로드합니다.</p>
              </div>
              <span className="badge text-bg-primary rounded-pill">ADMIN</span>
            </div>

            <div className="alert alert-primary border-0 rounded-4" role="alert">
              UTF-8 CSV 파일만 업로드하고, 업로드 시 기존 TrashBin 데이터는 전체 교체됩니다.
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">CSV 파일</label>
              <input
                type="file"
                accept=".csv,text/csv"
                className="form-control form-control-lg rounded-4"
                onChange={(event) => setCsvFile(event.target.files?.[0] ?? null)}
              />
            </div>

            <div className="d-grid">
              <button
                type="button"
                className="btn btn-primary btn-lg rounded-4"
                onClick={handleCsvUpload}
                disabled={!csvFile || csvUploading}
              >
                {csvUploading ? "업로드 중..." : "CSV 업로드"}
              </button>
            </div>

            {csvResult ? (
              <div className="mt-4 rounded-4 border bg-light p-3">
                <div className="fw-bold mb-2">업로드 결과</div>
                <div className="text-secondary">저장 건수: {csvResult.savedCount ?? 0}</div>
              </div>
            ) : null}
          </div>
        </div>

        <div className="col-12 col-xl-6">
          <div className="page-card h-100 p-4">
            <div className="d-flex justify-content-between align-items-start gap-3 mb-4">
              <div>
                <div className="text-uppercase small fw-bold text-primary mb-2">Image Upload</div>
                <h3 className="h5 fw-bold mb-1">대표 이미지 업로드</h3>
                <p className="text-secondary mb-0">`POST /trash-bins/images`에 `image` 파트로 이미지를 업로드합니다.</p>
              </div>
              <span className="badge text-bg-primary rounded-pill">ADMIN</span>
            </div>

            <div className="alert alert-info border-0 rounded-4" role="alert">
              파일명은 반드시 위도여야 합니다. 예: `35.808057.png`, `35.808057.webp`
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">이미지 파일</label>
              <input
                type="file"
                accept="image/*"
                className="form-control form-control-lg rounded-4"
                onChange={(event) => setImageFile(event.target.files?.[0] ?? null)}
              />
            </div>

            <div className="d-grid">
              <button
                type="button"
                className="btn btn-outline-primary btn-lg rounded-4"
                onClick={handleImageUpload}
                disabled={!imageFile || imageUploading}
              >
                {imageUploading ? "업로드 중..." : "이미지 업로드"}
              </button>
            </div>

            {imageResult ? (
              <div className="mt-4 rounded-4 border bg-light p-3">
                <div className="fw-bold mb-2">업로드 결과</div>
                <div className="small text-secondary mb-1">메시지: {imageResult.message}</div>
                <div className="small text-secondary mb-1">쓰레기통 ID: {imageResult.trashBinId}</div>
                <div className="small text-secondary mb-1">위도/경도: {imageResult.latitude} / {imageResult.longitude}</div>
                <div className="small text-secondary mb-1">중복 여부: {imageResult.alreadyExists ? "이미 존재함" : "신규 업로드"}</div>
                <div className="small text-secondary">저장 파일명: {imageResult.storedName}</div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="page-card table-card overflow-hidden">
        <div className="p-4 border-bottom d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-lg-center gap-3">
          <div>
            <div className="text-uppercase small fw-bold text-primary mb-2">TrashBin List</div>
            <h3 className="h5 fw-bold mb-1">저장된 쓰레기통 목록</h3>
            <p className="text-secondary mb-0">업로드 결과를 즉시 확인할 수 있도록 목록을 함께 제공합니다.</p>
          </div>
          <button type="button" className="btn btn-outline-primary rounded-pill px-4" onClick={() => loadTrashBins(page)}>
            새로고침
          </button>
        </div>

        {loading ? (
          <div className="p-5 text-center">
            <div className="spinner-border text-primary mb-3" role="status" />
            <div className="text-secondary">쓰레기통 목록을 불러오는 중입니다.</div>
          </div>
        ) : (
          <>
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead>
                  <tr>
                    <th>사진</th>
                    <th>주소</th>
                    <th>유형</th>
                    <th>설치 위치</th>
                    <th>관리 기관</th>
                    <th>위도</th>
                    <th>경도</th>
                  </tr>
                </thead>
                <tbody>
                  {trashBins.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center py-5 text-secondary">저장된 쓰레기통 데이터가 없습니다.</td>
                    </tr>
                  ) : (
                    trashBins.map((item) => (
                      <tr key={item.id}>
                        <td>
                          {item.photoUrl ? (
                            <img src={item.photoUrl} alt="쓰레기통" className="inquiry-image" />
                          ) : (
                            <span className="text-secondary">없음</span>
                          )}
                        </td>
                        <td>
                          <div className="fw-semibold">{item.address}</div>
                          <div className="small text-secondary">{item.cityCountyName} / {item.provinceName}</div>
                        </td>
                        <td>{item.binType || "-"}</td>
                        <td>{item.locationDescription || item.installationPoint || "-"}</td>
                        <td>
                          <div>{item.managementAgencyName || "-"}</div>
                          <div className="small text-secondary">{item.managementAgencyPhoneNumber || "-"}</div>
                        </td>
                        <td>{item.latitude}</td>
                        <td>{item.longitude}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 p-4 border-top bg-light-subtle">
              <div className="text-secondary small">
                페이지 {(pageInfo?.page ?? page) + 1} / {pageInfo?.totalPages ?? 1}, 총 {pageInfo?.totalElements ?? trashBins.length}건
              </div>
              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  disabled={!pageInfo?.hasPrevious}
                  onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                >
                  이전
                </button>
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  disabled={!pageInfo?.hasNext}
                  onClick={() => setPage((prev) => prev + 1)}
                >
                  다음
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

