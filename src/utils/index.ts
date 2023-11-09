// 根据属性扁平数组
export function flatArray<T extends { [prop: string]: T[] }>(array: T[], prop: string) {
  const _arr: T[] = [];
  array.forEach((item: T) => {
    const _child: T[] = item[prop];
    _arr.push(item);
    if (_child?.length) {
      _arr.push(...flatArray(_child, prop));
    }
  });
  return _arr;
}

// 利用a标签下载文件
export function downloadFile(fileUrl: string) {
  if (!fileUrl) {
    return '链接不存在';
  }
  try {
    let { pathname: fileName } = new window.URL(fileUrl);
    fileName = fileName.slice(fileName.lastIndexOf('/'));
    const a = document.createElement('a');
    a.href = fileUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    return true;
  } catch (error) {
    return (error as Error).message ?? '下载文件失败';
  }
}

/**
 * 字符串回退显示 '—'
 * @param text
 * @returns
 */
export function textFallback(text?: string | null) {
  return text || '—';
}

/**
 * 平缓滚动到指定元素
 */
export function scrollToTop(selector: string, behavior: ScrollBehavior = 'smooth') {
  document.querySelector(selector)?.scrollTo({
    top: 0,
    behavior
  });
}
