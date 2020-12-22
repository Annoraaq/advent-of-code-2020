module.exports = () => {
  const Node = (data) => ({ data, next: null, prev: null });

  let head = null;
  let tail = null;
  let size = 0;

  const getSize = () => size;

  const enqueue = data => {
    size++;

    if (head == null) {
      head = Node(data);
      tail = head;
      return head;
    }

    const newNode = Node(data);
    newNode.next = head;
    head.prev = newNode;
    head = newNode;
    return head;
  };

  const dequeue = () => {
    if (tail === null) return null;

    size--;

    const tailData = tail.data;
    if (tail.prev === null) {
      tail = null;
      head = null;
      return tailData;
    }

    tail.prev.next = null;
    tail = tail.prev;
    return tailData;
  };

  const peek = () => tail ? tail.data : null;

  return {
    size: getSize,
    enqueue,
    dequeue,
    peek,
  };
};
