export async function getParams(params: Promise<{ id: string }> | { id: string }) {
    if (params instanceof Promise) {
      return await params;
    }
    return params;
  }
  