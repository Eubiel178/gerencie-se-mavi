import Swal, { SweetAlertOptions, SweetAlertResult } from "sweetalert2";

export async function swalModal(
  props: SweetAlertOptions
): Promise<SweetAlertResult> {
  return await Swal.fire(props);
}
