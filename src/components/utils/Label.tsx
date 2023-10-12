interface LabelProps {
  content: React.ReactNode | React.ComponentType;
}

function isComponentType(node: React.ReactNode | React.ComponentType): node is React.ComponentType {
  return typeof node === "function";
}

export const Label = (props: LabelProps) => {
  if (isComponentType(props.content)) {
    return <props.content />;
  }

  return <>{props.content}</>;
}
